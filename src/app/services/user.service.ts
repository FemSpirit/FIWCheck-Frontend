import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentProfil {
  user_id: number | null;
  name: string;
  email: string;
  studiengang: string;
  stupo_id: string;
  vollzeit: boolean;
  awe_variante: string;
  studium_beginn: string;
  studienberatung: boolean;
  studiendatenLocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Passend zu @RequestMapping("/user") in UserController.java
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  // Ruft @GetMapping("/{id}") im Backend auf -> GET http://localhost:8080/user/{id}
  getProfil(userId: number): Observable<StudentProfil> {
    return this.http.get<StudentProfil>(`${this.apiUrl}/${userId}`);
  }

  // Sendet Änderungen an PUT http://localhost:8080/user/{id}
  updateProfil(userId: number, daten: StudentProfil): Observable<StudentProfil> {
    return this.http.put<StudentProfil>(`${this.apiUrl}/${userId}`, daten);
  }

  // Passwort ändern
  changePassword(userId: number, altesPasswort: string, neuesPasswort: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${userId}/password`, {
      altesPasswort,
      neuesPasswort
    });
  }
}