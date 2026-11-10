import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';



@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin(): Promise<void> {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte gib E-Mail und Passwort ein.';
      return;
    }

    this.authService.loginUser(
      this.email, this.password).subscribe({
        //veravreitet Server Antwort
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

