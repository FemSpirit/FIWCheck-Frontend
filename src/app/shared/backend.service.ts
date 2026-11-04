import { Injectable } from '@angular/core';
import {User } from './user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

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
}