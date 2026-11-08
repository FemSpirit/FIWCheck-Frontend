import { Component } from '@angular/core';
import { BackendService } from '../shared/backend.service';
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
    private backendService: BackendService,
    private router: Router
  ) {}

  async onLogin(): Promise<void> {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte gib E-Mail und Passwort ein.';
      return;
    }

    try {
      // Ruft Methode aus BackendService auf
      await this.backendService.loginUser({
        email: this.email,
        password: this.password,
      });

      // Bei Erfolg zur Startseite weiterleiten
      this.router.navigate(['/startseite']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Login fehlgeschlagen.';
    }
  }
  
}
