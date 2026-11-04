import { Component, inject } from '@angular/core';
import { BackendService } from '../shared/backend.service';
import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { User } from '../shared/user';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.html',
  styleUrl: './registrierung.css',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class Registrierung {

  private backendService = inject(BackendService);

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, 
      Validators.email, 
      Validators.pattern('^[a-zA-Z0-9._%+-]+@(student\\.)?htw-berlin\\.de$')]),
    role: new FormControl('', Validators.required)
  });

  roles = [ "admin", "user"];
  hide = true;
  hide2 = true;
  user!: User;

  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

 async onSubmit(){
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const values = this.registerForm.value;
    this.user = {
      username: values.username!,
      password: values.password!,
      email: values.email!,
      role: values.role!
    };

    try {
      // Aufruf deiner registerUser-Methode aus dem BackendService
      await this.backendService.registerUser(this.user);
      
      this.isLoading = false;
      this.successMessage = 'Registrierung erfolgreich!';
      this.registerForm.reset();
    } catch (err: any) {
      this.isLoading = false;
      this.errorMessage = err.message || 'Registrierung fehlgeschlagen. Bitte versuche es später erneut.';
    }
  }
}
