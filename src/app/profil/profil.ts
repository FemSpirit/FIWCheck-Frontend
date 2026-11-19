import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil {
  // Exakte Attributnamen passend zum ER-Modell (User, Student, Stupo)
  profil = {
    user_id: null as number | null,
    name: '',
    email: '',
    studiengang: 'Informatik und Wirtschaft',
    stupo_id: '',             // Beziehung: Student "studiert nach" Stupo
    vollzeit: true,           // Attribut "Vollzeit" (true = Vollzeit, false = Teilzeit)
    awe_variante: '',         // Attribut "awe_variante"
    studium_beginn: '',       // Attribut "studium_beginn" (Startsemester)
    studienberatung: false,
    studiendatenLocked: false // Frontend-Hilfsschalter: true = StuPO & Startsemester sind gesperrt
  };

  avatarUrl = 'assets/images/katzefiwilogo.png'; // Platzhalter-URL für das Profilbild

  // Dropdown-Auswahloptionen für das HTML-Formular
  stupoOptionen = ['StuPO 2024', 'StuPO 2014'];
  vollzeitOptionen = [
    { label: 'Vollzeit', value: true },
    { label: 'Teilzeit', value: false }
  ];
  aweOptionen = ['Variante 1:Eine Sprache vertiefen + freie AWE', 'Variante 2: Zwei verschiedene Fremdsprachen', 'Variante 3: Eine Fremdsprache extrem vertiefen'];
  semesterOptionen = ['WiSe 2025/26', 'WiSe 2024/25', 'WiSe 2023/24', 'WiSe 2022/23', 'WiSe 2021/22', 'WiSe 2020/21', 'WiSe 2019/20', 'WiSe 2018/19', 'WiSe 2017/18', 'WiSe 2016/17', 'WiSe 2015/16', 'WiSe 2014/15'];

  showConfirmModal = false;
  saveSuccessMessage = '';

  onSaveClick(): void {
    if (!this.profil.studiendatenLocked && (this.profil.stupo_id || this.profil.studium_beginn)) {
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
}