import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../shared/user';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';

export interface DialogData { //pop up dialog data interface
  headline: string;
  info: string;
}

@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.html',
  styleUrl: './registrierung.css',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule, 
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule, // Importiere ReactiveFormsModule für die Verwendung von FormGroup und FormControl
    MatDialogModule
  ]
})
export class Registrierung {
  private auth = inject(AuthService);
  public dialog = inject(MatDialog); //pop up von benachrichtigungen

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email, 
      Validators.pattern('^[a-zA-Z0-9._%+-]+@(student\\.)?htw-berlin\\.de$')
    ]),


    role: new FormControl('', Validators.required)
  });

  roles = [ "admin", "user"];
  hide = true;
  hide2 = true;
  user!: User;

  valid(): boolean {
    const check = 
    !this.registerForm.controls['username'].hasError('required') &&
    !this.registerForm.controls['password'].hasError('required') &&
    !this.registerForm.controls['password'].hasError('minlength') &&
    !this.registerForm.controls['password2'].hasError('required') &&
    !this.registerForm.controls['password2'].hasError('minlength') &&
    !this.registerForm.controls['email'].hasError('required') &&
    !this.registerForm.controls['email'].hasError('email') &&
    this.registerForm.value.password == this.registerForm.value.password2;
    console.log('valid : ', check);
    return check;
  }

  differentPassword(): boolean {
    const check = this.registerForm.dirty && this.registerForm.value.password != this.registerForm.value.password2;
    if(check) {
      this.registerForm.controls.password2.setErrors({'incorrect': true});
    } else {
      this.registerForm.controls.password2.setErrors(null); // Korrigiert: null entfernt den Fehler sauber
    }
    console.log('check : ', check);
    return check;
  }

  onSubmit(): void {
    const values = this.registerForm.value;
    this.user = {
      username: values.username!,
      password: values.password!,
      email: values.email!,
      role: values.role!
    };
    console.log(this.user); //entwicklertool: Ausgabe der User-Daten in der Konsole
    if(this.valid()) {
      console.log('eingaben gueltig! Registrierung wird vorgenommen');
      this.auth.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('response', response);
          this.openDialog({ headline: "Erfolg", info: "User " + response.name + " registriert!" });
        },
        error: (err) => {
          console.log('HttpErrorResponse : ', err);
          
          if (err.status === 400 && err.error) { //bad request, backend validation errors
            const backendErrors = err.error;
            if (backendErrors.email) {
              this.registerForm.controls['email'].setErrors({ serverError: backendErrors.email });
            }
            if (backendErrors.username) {
              this.registerForm.controls['username'].setErrors({ serverError: backendErrors.username });
            }
            if (backendErrors.password) {
              this.registerForm.controls['password'].setErrors({ serverError: backendErrors.password });
            }
          } else {
            this.openDialog({ headline: "Fehler", info: "Diese Server ist im Moment nicht erreichbar, versuche es später erneut" });
          }
        },
        complete: () => console.log('Registrierung erfolgreich abgeschlossen')
      });
    } else {
      console.log('eingaben ungueltig! Registrierung wird abgelehnt');
    }
  }

  openDialog(data: DialogData) {
    this.dialog.open(ConfirmComponent, { data: data });
  }
}