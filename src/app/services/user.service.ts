import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StudentProfil {
  userId: number | null;
  name: string;
  email: string;
  stupo: string;
  vollzeit: boolean;
  aweVariante: string;
  studiumBeginn: string;
  studienberatung: boolean;
  studiendatenLocked: boolean;
}

//Nur die Attribute, die im Backend in der Datenbank gespeichert werden, werden hier definiert. Die Attribute "showPw", "showPasswordForm", "passwordErrorMessage" und "passwordSuccessMessage" sind nur für das Frontend relevant und werden daher nicht in dieser Schnittstelle definiert.
export interface Studieninformationen {
  stupo: string;
  vollzeit: boolean;
  aweVariante: string;
  studiumBeginn: string;
  //Studentenberatung: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Passend zu @RequestMapping("/user") in UserController.java
  private baseUrl = environment.apiUrl;
  private userURL = `${this.baseUrl}/user`;
  private profileURL = `${this.baseUrl}/studentprofil`;

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
  
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Ruft @GetMapping("/{id}") im Backend auf -> GET http://localhost:8080/user/{id}
  getProfil(): Observable<StudentProfil> {
    return this.http.get<StudentProfil>(this.profileURL);
  }

  // PATCH/ user/{id} -> Name ändern
  updateName(userId: number, name: string): Observable<StudentProfil> {
    return this.http.patch<StudentProfil>(`${this.userURL}/${userId}`, {username: name }, { headers: this.getAuthHeaders() });
  }

  // PUT /studentprofil/studieninformationen -> Studiendaten speichern
  updateStudieninformationen(daten: Studieninformationen): Observable<StudentProfil> {
    return this.http.put<StudentProfil>(`${this.profileURL}/studieninformationen`, daten);
  }


  // DELETE /user/{id} -> Konto löschen 
  deleteAccount(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.userURL}/${userId}`, { headers: this.getAuthHeaders() });
  }

  // Passwort ändern
  changePassword(userId: number, altesPasswort: string, neuesPasswort: string): Observable<void> {
    return this.http.put<void>(`${this.userURL}/${userId}/password`, {
      altesPasswort,
      neuesPasswort
    });
  }
}