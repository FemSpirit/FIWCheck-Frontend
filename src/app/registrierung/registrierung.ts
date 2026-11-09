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

export interface DialogData {
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
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class Registrierung {
  private auth = inject(AuthService);
  public dialog = inject(MatDialog);

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
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
    !this.registerForm.controls['name'].hasError('required') &&
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
      name: values.name!,
      password: values.password!,
      email: values.email!,
      role: values.role!
    };
    console.log(this.user);
    if(this.valid()) {
      console.log('eingaben gueltig! Registrierung wird vorgenommen');
      this.auth.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('response', response);
          this.openDialog({ headline: "Erfolg", info: "User " + response.name + " registriert!" });
        },
        error: (err) => {
          console.log('HttpErrorResponse : ', err);
          
          if (err.status === 400 && err.error) {
            const backendErrors = err.error;
            if (backendErrors.email) {
              this.registerForm.controls['email'].setErrors({ serverError: backendErrors.email });
            }
            if (backendErrors.name) {
              this.registerForm.controls['name'].setErrors({ serverError: backendErrors.name });
            }
            if (backendErrors.password) {
              this.registerForm.controls['password'].setErrors({ serverError: backendErrors.password });
            }
          } else {
            this.openDialog({ headline: "Fehler", info: "Diese E-Mail existiert bereits, bitte wähle eine andere" });
          }
        },
        complete: () => console.log('register completed')
      });
    } else {
      console.log('eingaben ungueltig! Registrierung wird abgelehnt');
    }
  }

  openDialog(data: DialogData) {
    this.dialog.open(ConfirmComponent, { data: data });
  }
}