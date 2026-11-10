import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Getter für einfachen Zugriff auf Formularfelder
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

const { email, password } = this.loginForm.value;

    this.authService.loginUser( this.email, this.password).subscribe({
        //verarbeitet Server Antwort
        next:(response: any) => {
          const token = response.body?.token;
          if (token){
            localStorage.setItem('token', token);
          }
          //leitet auf startseite
          this.router.navigate(['/startseite']);
        },
        error: (error: any) => {
          console.error('Login-Fehler:', error);
          this.errorMessage = error.message || 'Login fehlgeschlagen.';
        }
      } );

    }
}

