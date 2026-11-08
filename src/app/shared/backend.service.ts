import { Injectable } from '@angular/core';
import {User, LoginRequest,LoginResponse } from './user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

    private loginUrl = 'http://localhost:8080/user/login';
    private apiUrl = 'http://localhost:8080/api/register';
  constructor() { }

  async registerUser( user: User): Promise<any> {
    try {
    let response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) 
    });
    if (!response.ok) {
        throw new Error('Registrierung fehlgeschlagen');
      }
    let result = await response.json();
    console.log('Erfolgreich registriert:', result);
    return result;
  }
    catch (error) {
        console.error('Fehler bei der Registrierung:', error);  
    }
  }

  async loginUser(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(this.loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    // falls Status 401 zurückkommt dann fehler in login.ts werfen
    if (!response.ok) {
      throw new Error('Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.');
    }

    const data: LoginResponse = await response.json();

    // jwt im localStorage speichern
    if (data && data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  }
}