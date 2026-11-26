import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, StudentProfil } from '../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {
  userId: number | null = null;

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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Da SSR aktiviert ist, greifen wir nur im Browser sicher auf localStorage zu
    if (isPlatformBrowser(this.platformId)) {
      const storedId = localStorage.getItem('user_id');
      if (storedId && Number.isSafeInteger(Number(storedId)) && Number(storedId) > 0) {
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

        this.profil.name = daten.name ?? '';
        this.profil.email = daten.email ?? '';
        this.profil.stupo = daten.stupoId === 1 ? 'StuPO 2024' : daten.stupoId === 2 ? 'StuPO 2014' : '';
        this.profil.studiumBeginn = daten.startsemester ?? '';
        this.profil.aweVariante = this.mapAweShortToText(daten.aweVariante);
        this.profil.studiendatenLocked = Boolean(daten.stupoId && daten.startsemester && daten.aweVariante);
        this.isLoading = false;
      },
      error: () => {
        // Fallback: Falls das Backend lokal nicht läuft oder User noch nicht existiert
        this.errorMessage = 'Profildaten konnten nicht geladen werden';
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
    if (this.userId == null) {
      this.passwordErrorMessage = 'User-ID fehlt';
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
    this.showConfirmModal = false;
    this.speichernAusfuehren();
  }

  cancelModal(): void {
    this.showConfirmModal = false;
  }

  private speichernAusfuehren(): void {
    const daten = {
      stupoId: this.profil.stupo === 'StuPO 2024' ? 1 :
               this.profil.stupo === 'StuPO 2014' ? 2 : 0,

      startsemester: this.profil.studiumBeginn,

      aweVariante: this.profil.aweVariante.startsWith('Variante 1') ? 1 :
                   this.profil.aweVariante.startsWith('Variante 2') ? 2 :
                   this.profil.aweVariante.startsWith('Variante 3') ? 3 : 0
  };
  // Pflichtfelder überprüfen
  if (!daten.stupoId || !daten.startsemester || !daten.aweVariante) {
    this.errorMessage = 'Bitte alle Studiendaten auswählen.';
    return;
}

this.errorMessage = '';

// PUT-Anfrage an das Backend
this.authService.updateStudieninformationen(daten).subscribe({
    next: () => {
        this.profil.studiendatenLocked = true;

        this.saveSuccessMessage =
            'Deine Angaben wurden erfolgreich gespeichert!';

        setTimeout(() => (this.saveSuccessMessage = ''), 3500);
    },
    error: () => {
        this.errorMessage =
            'Fehler beim Speichern der Studiendaten.';
    }
  });
  }
  // PATCH-Anfrage: Namen des Benutzers ändern
onNameChange(): void {
  this.errorMessage = '';
  this.saveSuccessMessage = '';

  if (this.userId === null) {
    this.errorMessage = 'User-ID fehlt';
    return;
  }

  if (!this.profil.name.trim()) {
    this.errorMessage = 'Bitte einen Namen eingeben';
    return;
  }

  this.userService.updateName(
    this.userId,
    this.profil.name.trim()
  ).subscribe({
    next: () => {
      this.saveSuccessMessage = 'Name erfolgreich geändert';
    },
    error: () => {
      this.errorMessage = 'Fehler beim Ändern des Namens';
    }
  });
}

// DELETE Benutzerkonto löschen
onDeleteAccount(): void {
  this.errorMessage = '';

  if (this.userId === null) {
    this.errorMessage = 'User-ID fehlt.';
    return;
  }

  const bestaetigt = window.confirm(
    'Möchtest du dein Benutzerkonto wirklich dauerhaft löschen?'
  );

  if (!bestaetigt) {
    return;
  }

  this.userService.deleteAccount(this.userId).subscribe({
    next: () => {
      this.authService.logout();
      this.router.navigate(['/login']); //Erstmal loginseite kann später nach absprache geändert werden
    },
    error: () => {
      this.errorMessage = 'Fehler beim Löschen des Benutzerkontos';
    }
  });
}
 
  private mapAweShortToText(short?: number): string {
    if (short === 1) return this.aweOptionen[0];
    if (short ===  2) return this.aweOptionen[1];
    if (short ===  3) return this.aweOptionen[2];
    return '';
  }
}