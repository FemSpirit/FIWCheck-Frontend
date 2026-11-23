import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, StudentProfil } from '../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {
  userId: number = 1;

  // Exakte Attributnamen passend zum ER-Modell (User, Student, Stupo)

  profil = {
    user_id: null,
    name: '',
    email: '',
    stupo: '',             // Beziehung: Student "studiert nach" Stupo
    vollzeit: true,           // Attribut "Vollzeit" (true = Vollzeit, false = Teilzeit)
    aweVariante: '',         // Attribut "awe_variante"
    studiumBeginn: '',       // Attribut "studium_beginn" (Startsemester)
    studienberatung: false,
    studiendatenLocked: false // Frontend-Hilfsschalter: true = StuPO & Startsemester sind gesperrt
  };

  avatarUrl = 'assets/images/katzefiwilogo.png';
  isLoading = false;
  errorMessage = '';

  // Passwortänderung- neu
  passwordErrorMessage = '';
  passwordSuccessMessage = '';
  altesPasswort = '';
  neuesPasswort = '';
  neuesPasswortBestaetigen = '';
  showPw = false;
  showPasswordForm = false;
  

  // Dropdown-Auswahloptionen für das HTML-Formular
  stupoOptionen = ['StuPO 2024', 'StuPO 2014'];
  vollzeitOptionen = [
    { label: 'Vollzeit', value: true },
    { label: 'Teilzeit', value: false }
  ];
  aweOptionen = [
    'Variante 1:Eine Sprache vertiefen + freie AWE','Variante 2: Zwei verschiedene Fremdsprachen','Variante 3: Eine Fremdsprache extrem vertiefen'];
  semesterOptionen = [
    'WiSe 2025/26', 'WiSe 2024/25', 'WiSe 2023/24', 'WiSe 2022/23','WiSe 2021/22', 'WiSe 2020/21', 'WiSe 2019/20', 'WiSe 2018/19','WiSe 2017/18', 'WiSe 2016/17', 'WiSe 2015/16', 'WiSe 2014/15'];

  showConfirmModal = false;
  saveSuccessMessage = '';
  

  constructor(
    private authService: AuthService,
    private userService: UserService, //hat gefehlt
    
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Da SSR aktiviert ist, greifen wir nur im Browser sicher auf localStorage zu
    if (isPlatformBrowser(this.platformId)) {
      const storedId = localStorage.getItem('user_id');
      if (storedId) {
        this.userId = Number(storedId);
      }
      this.ladeProfildaten();
    }
  }

  ladeProfildaten(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getStudentprofil().subscribe({
      next: (daten) => {

        this.profil.name = daten.username ?? '';
        this.profil.email = daten.email ?? '';
        this.profil.stupo = daten.stupoId === 1 ? 'StuPO 2024' : daten.stupoId === 2 ? 'StuPO 2014' : '';
        this.profil.studiumBeginn = this.mapSemesterNumberToText(daten.startsemester);
        this.profil.aweVariante = this.mapAweShortToText(daten.aweVariante);
        this.profil.studiendatenLocked = Boolean(daten.stupoId && daten.startsemester && daten.aweVariante);
        this.isLoading = false;
      },
      error: () => {
        // Fallback: Falls das Backend lokal nicht läuft oder User noch nicht existiert
        this.isLoading = false;
      }
    });
  }

  //Neues Passwort ändern
  onPasswordChange(): void {
    this.passwordErrorMessage = '';
    this.passwordSuccessMessage = '';

    if (!this.altesPasswort || !this.neuesPasswort || !this.neuesPasswortBestaetigen) {
      this.passwordErrorMessage = 'Bitte füllen Sie alle Passwort-Felder aus.';
      return;
    }

    if (this.neuesPasswort.length < 8) {
      this.passwordErrorMessage = 'Das neue Passwort muss mindestens 8 Zeichen lang sein.';
      return;
    }
    if (this.neuesPasswort !== this.neuesPasswortBestaetigen) {
      this.passwordErrorMessage = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    this.userService.changePassword(this.userId, this.altesPasswort, this.neuesPasswort).subscribe({
  next: () => {
    this.passwordSuccessMessage = 'Passwort erfolgreich geändert!';
    this.altesPasswort = '';
    this.neuesPasswort = '';
    this.neuesPasswortBestaetigen = '';
    this.showPasswordForm = false;
  },
  error: () => {
    this.passwordErrorMessage = 'Fehler beim Ändern des Passworts.';
  }
});
    

  }

  onSaveClick(): void {                //HIER ist stupo
    if (!this.profil.studiendatenLocked && (this.profil.stupo || this.profil.studiumBeginn)) {
      this.showConfirmModal = true;
    } else {
      this.speichernAusfuehren();
    }
  }

  confirmFirstSave(): void {
    this.profil.studiendatenLocked = true;
    this.showConfirmModal = false;
    this.speichernAusfuehren();
  }

  cancelModal(): void {
    this.showConfirmModal = false;
  }

  private speichernAusfuehren(): void {
    this.saveSuccessMessage = 'Deine Angaben wurden erfolgreich gespeichert!';
    setTimeout(() => (this.saveSuccessMessage = ''), 3500);
  }
  //Wandelt den ausgewählten Text in BA Format
  private mapSemesterTextToNumber(text: string): number {
    const match = text.match(/(\d{4})/);
    return match ? Number(`${match[1]}2`) : 20242;
  }
  //Hier genau anders herum
  private mapSemesterNumberToText(sem?: number): string {
    if (!sem) return '';
    const jahr = Math.floor(sem / 10);
    const kurz = String((jahr + 1) % 100).padStart(2, '0');
    return `WiSe ${jahr}/${kurz}`;
  }
   //Kürzt den AWE Text auf max länge der DB Spalte
  private mapAweTextToShort(text: string): string {
    if (text.startsWith('Variante 1')) return 'Variante 1';
    if (text.startsWith('Variante 2')) return 'Variante 2';
    if (text.startsWith('Variante 3')) return 'Variante 3';
    return text.substring(0, 10);
  }
   //Hier genau anders herum
  private mapAweShortToText(short?: string): string {
    if (short === 'Variante 1') return this.aweOptionen[0];
    if (short === 'Variante 2') return this.aweOptionen[1];
    if (short === 'Variante 3') return this.aweOptionen[2];
    return short ?? '';
  }
}