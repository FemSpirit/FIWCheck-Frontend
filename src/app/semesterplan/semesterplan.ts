import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Modul {
  modul_nummer: string; //z.B. b11, b12
  ects: number; //leistungspunkte
  stupo: number; //2024 oder 2014
  bezeichnung: string; //Name des Moduls, z.B. "Programmieren 1"
  empfohlenes_semester: number; //Vollzeit //optional, z.B. 1, 2, 3, 4, 5, 6
  empfohlenessemester_tz: number; //Teilzeit //optional, z.B. 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  angebotssemester: 'ws' | 'ss'; //Wintersemester, Sommersemester
  statusText?: string; //optional, z.B. "belegt / geplant" oder "laut StuPO"
  note?: number; //optional, z.B. 1.0, 2.3, 4.0
}

// Datenstruktur für die Metadaten eines einzelnen Semesters (Kopfdaten/Rahmendaten)
export interface SemesterInfo {
  nummer: number;
  status: string;
  richtwert_ects: number;
}

// Konfiguriert die Klasse als Standalone-Komponente mit HTML-Template und CSS-Stylesheet
@Component({
  selector: 'app-semesterplan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './semesterplan.html',
  styleUrls: ['./semesterplan.css'],
})

//steuert ob die persönliche Planung oder der StuPO-Vorschlag angezeigt wird
export class Semesterplan implements OnInit {
  activeTab: 'vorschlag' | 'personal' =
    'personal'; /* schaltet um zwischen Fenster "Deine persönliche Planung" und "Algorithmischer Vorschlag für die Semesterplanung " */
  selectedSemester: number | null = null;

  // Vollständige Modulliste
  // Diese Liste enthält alle Module, die in der StuPO definiert sind, und dient als Basis für die persönliche Planung, solange die DB nicht befüllt ist
  readonly alleModuleBasis: Modul[] = [ //solange DB noch nicht läuft //readonly verhindert, dass die Daten während der Laufzeit versehentlich verändert werden
    {
      modul_nummer: 'b11',
      stupo: 2024,
      bezeichnung: 'Programmieren 1',
      ects: 6,
      angebotssemester: 'ws',
      empfohlenes_semester: 1,
      empfohlenessemester_tz: 1,
    },
    {
      modul_nummer: 'b12',
      stupo: 2024,
      bezeichnung: 'Rechnerarchitektur/Betriebssysteme',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 1,
      empfohlenessemester_tz: 1,
    },
    {
      modul_nummer: 'b13',
      stupo: 2024,
      bezeichnung: 'Grundlegende Konzepte der Informatik',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 1,
      empfohlenessemester_tz: 1,
    },
    {
      modul_nummer: 'b14',
      stupo: 2024,
      bezeichnung: 'BWL 1: Grundlagen der BWL',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 1,
      empfohlenessemester_tz: 1,
    },
    {
      modul_nummer: 'b15',
      stupo: 2024,
      bezeichnung: 'Mathematik 1',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 1,
      empfohlenessemester_tz: 1,
    },
    {
      modul_nummer: 'b16',
      stupo: 2024,
      bezeichnung: 'Fremdsprache 1',
      ects: 4,
      angebotssemester: 'ws',
      empfohlenes_semester: 1,
      empfohlenessemester_tz: 3,
    },

    {
      modul_nummer: 'b21',
      stupo: 2024,
      bezeichnung: 'Programmieren 2',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 2,
      empfohlenessemester_tz: 2,
    },
    {
      modul_nummer: 'b22',
      stupo: 2024,
      bezeichnung: 'Mathematik 2',
      ects: 6,
      angebotssemester: 'ss',
      empfohlenes_semester: 2,
      empfohlenessemester_tz: 4,
    },
    {
      modul_nummer: 'b23',
      stupo: 2024,
      bezeichnung: 'Software-Engineering 1',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 2,
      empfohlenessemester_tz: 2,
    },
    {
      modul_nummer: 'b24',
      stupo: 2024,
      bezeichnung: 'Webtechnologien',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 2,
      empfohlenessemester_tz: 2,
    },
    {
      modul_nummer: 'b25',
      stupo: 2024,
      bezeichnung: 'BWL 2: Rechnungswesen',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 2,
      empfohlenessemester_tz: 2,
    },
    {
      modul_nummer: 'b26',
      stupo: 2024,
      bezeichnung: 'Fremdsprache 2',
      ects: 4,
      angebotssemester: 'ss',
      empfohlenes_semester: 2,
      empfohlenessemester_tz: 4,
    },

    {
      modul_nummer: 'b31',
      stupo: 2024,
      bezeichnung: 'Data Science',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    },
    {
      modul_nummer: 'b32',
      stupo: 2024,
      bezeichnung: 'Software-Engineering 2',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 3,
    },
    {
      modul_nummer: 'b33',
      stupo: 2024,
      bezeichnung: 'Datenbanksysteme',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 3,
    },

    {
      modul_nummer: 'b34',
      stupo: 2024,
      bezeichnung: 'Softwareentwicklungsprojekt',
      ects: 10,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    },

    /* {
      modul_nummer: 'b34.1',
      stupo: 2024,
      bezeichnung: 'Softwareentwicklungsprojekt',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    },

    {
      modul_nummer: 'b34.2',
      stupo: 2024,
      bezeichnung: 'Arbeitswelt IT',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    }, */

    {
      modul_nummer: 'b35',
      stupo: 2024,
      bezeichnung: 'Projektmanagement',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    },
    /* {
      modul_nummer: 'b35.1',
      stupo: 2024,
      bezeichnung: 'Agiles Projektmanagement',
      ects: 2.5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    },
    {
      modul_nummer: 'b35.2',
      stupo: 2024,
      bezeichnung: 'Konfliktmanagement und Mediation',
      ects: 2.5,
      angebotssemester: 'ws',
      empfohlenes_semester: 3,
      empfohlenessemester_tz: 5,
    }, */

    {
      modul_nummer: 'b41',
      stupo: 2024,
      bezeichnung: 'Wahlpflichtmodul (Wirtschafts-) Informatik 1',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 4,
      empfohlenessemester_tz: 4,
    },
    {
      modul_nummer: 'b42',
      stupo: 2024,
      bezeichnung: 'Wissenschafliches Schreiben',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 4,
      empfohlenessemester_tz: 8,
    },
    {
      modul_nummer: 'b43',
      stupo: 2024,
      bezeichnung: 'Fachpraktikum',
      ects: 20,
      angebotssemester: 'ss',
      empfohlenes_semester: 4,
      empfohlenessemester_tz: 6,
    },

    {
      modul_nummer: 'b51',
      stupo: 2024,
      bezeichnung: 'Human Computer Interaction',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 5,
      empfohlenessemester_tz: 7,
    },
    {
      modul_nummer: 'b52',
      stupo: 2024,
      bezeichnung: 'Verteilte Systeme',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 5,
      empfohlenessemester_tz: 9,
    },
    {
      modul_nummer: 'b53',
      stupo: 2024,
      bezeichnung: 'Datenschutz und Datensicherheit',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 5,
      empfohlenessemester_tz: 7,
    },
    {
      modul_nummer: 'b54',
      stupo: 2024,
      bezeichnung: 'Wahlpflichtmodul (Wirtschafts-) Informatik 2',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 5,
      empfohlenessemester_tz: 7,
    },
    {
      modul_nummer: 'b55',
      stupo: 2024,
      bezeichnung: 'Informatik und Gesellschaft',
      ects: 5,
      angebotssemester: 'ws',
      empfohlenes_semester: 5,
      empfohlenessemester_tz: 7,
    },
    {
      modul_nummer: 'b56',
      stupo: 2024,
      bezeichnung: 'Projekte in der Wirtschaft',
      ects: 6,
      angebotssemester: 'ws',
      empfohlenes_semester: 5,
      empfohlenessemester_tz: 9,
    },

    {
      modul_nummer: 'b61',
      stupo: 2024,
      bezeichnung: 'Modellierung von Informationssystemen',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 8,
    },
    {
      modul_nummer: 'b62',
      stupo: 2024,
      bezeichnung: 'BWL 3: Berufspraxis IT-Wirtschaft',
      ects: 5,
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 8,
    },
    {
      modul_nummer: 'b63',
      stupo: 2024,
      bezeichnung: 'AWE-Modul 1',
      ects: 2,
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 4,
    },
    {
      modul_nummer: 'b64',
      stupo: 2024,
      bezeichnung: 'AWE-Modul 2',
      ects: 2,
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 8,
    },
    {
      modul_nummer: 'b65',
      stupo: 2024,
      bezeichnung: 'Bachelorseminar und Abschlusskolloquium',
      ects: 1.5, //ursprünglich 3 LP aber Bachelorseminiar und Abschlusskolloquium werden zusammengelegt, daher nur 1,5 LP
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 10,
    },
    {
      modul_nummer: 'b65.1',
      stupo: 2024,
      bezeichnung: 'Bachelorseminar',
      ects: 1.5,
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 10,
    },
    {
      modul_nummer: 'b66',
      stupo: 2024,
      bezeichnung: 'Bachelorarbeit',
      ects: 12,
      angebotssemester: 'ss',
      empfohlenes_semester: 6,
      empfohlenessemester_tz: 10,
    },
  ];

  // Alle noch nicht eingeplanten Module in der persönlichen Planung
  verfuegbareModule: Modul[] = []; //extra anglegt (ohne readonly am Anfang) damit Methoden auf die Module zugreifen können und diese ggf. verändern können

  // Persönliche Planung (startet leer mit "+ neues Semester hinzufügen")
  personalSemesterListe: SemesterInfo[] = [];
  personalGeplanteModuleMap: { [semester: number]: Modul[] } = {};


  // StuPO-Vorschlag (6 feste Semester im Vollzeitstudium)
  vorschlagSemesterListe: SemesterInfo[] = [
    { nummer: 1, status: 'Wintersemester', richtwert_ects: 30 },
    { nummer: 2, status: 'Sommersemester', richtwert_ects: 30 },
    { nummer: 3, status: 'Wintersemester', richtwert_ects: 30 },
    { nummer: 4, status: 'Sommersemester', richtwert_ects: 30 },
    { nummer: 5, status: 'Wintersemester', richtwert_ects: 31 },
    { nummer: 6, status: 'Sommersemester', richtwert_ects: 29 },
  ];
  // Dictionary/Map: Ordnet jeder Semester-Nummer ein Array der dort eingeplanten Module zu
  vorschlagGeplanteModuleMap: { [semester: number]: Modul[] } = {};

  // 1. In ngOnInit():
  ngOnInit(): void {
    // NUR für Tab "personal": kopiert alle Module in den Pool
    this.verfuegbareModule = this.alleModuleBasis.map((m) => ({ ...m }));

    // NUR für Tab "vorschlag": ordnet b1x -> 1. Sem, b2x -> 2. Sem, ... zu
    for (let sem = 1; sem <= 6; sem++) {
      this.vorschlagGeplanteModuleMap[sem] = this.alleModuleBasis
        .filter((m) => m.modul_nummer.startsWith(`b${sem}`))
        .map((m) => ({ ...m, statusText: 'laut StuPO' }));
    }
  }

  get aktuelleSemesterListe(): SemesterInfo[] {
    return this.activeTab === 'vorschlag'
      ? this.vorschlagSemesterListe
      : this.personalSemesterListe;
  }

  get aktuelleModuleMap(): { [semester: number]: Modul[] } {
    return this.activeTab === 'vorschlag'
      ? this.vorschlagGeplanteModuleMap
      : this.personalGeplanteModuleMap;
  }

  get gefilterteVerfuegbareModule(): Modul[] {
    if (this.activeTab === 'vorschlag' || this.selectedSemester === null) {
      return [];
    }

    const zielSemester = this.selectedSemester;
    // Ungerade = 'ws', Gerade = 'ss'
    const zielTurnus: 'ws' | 'ss' = zielSemester % 2 === 1 ? 'ws' : 'ss';

    return this.verfuegbareModule.filter(
      (modul) =>
        modul.empfohlenes_semester === zielSemester || modul.angebotssemester === zielTurnus,
    );
  }

  setTab(tab: 'vorschlag' | 'personal'): void {
    this.activeTab = tab;
    if (tab === 'vorschlag') {
      this.selectedSemester = 1;
    } else {
      this.selectedSemester =
        this.personalSemesterListe.length > 0
          ? this.personalSemesterListe[this.personalSemesterListe.length - 1].nummer
          : null;
    }
  }

  selectSemester(nummer: number): void {
    this.selectedSemester = nummer;
  }

  /**
   * author @krakersiq
   * Legt beim Klick auf "neues Semester hinzufügen +" direkt das nächste Semester an
   * und zählt unbegrenzt hoch (1 = WiSe, 2 = SoSe, 3 = WiSe, ..., 7 = WiSe, ...)
   *   WEITERE IDEE: wenn man über 10 Semester hinzufügt sollte man drauf aufmerksam gemacht werden, bzw nach etwas gefragt werden //nur was?
   */
  neuesSemesterHinzufuegen(): void { //:void es wird kein Wert zurückgegeben, sondern es wir nur der Zustand der Klasse verändert //verändert nur Daten im Hintergrund
    const naechsteNummer = this.personalSemesterListe.length + 1; //Semesterliste im Tab 'personal' zählt wie viele Semester es bereits gibt und durch +1 ensteht die nächste Nummer z.b. sind 2 Sem vorhanden wird nächstenummer zu 3
    let turnusLabel = 'Sommersemester'; //Man geht erst einmal davon aus, dass es ein 'Sommersemester' ist
    if (naechsteNummer % 2 === 1) { //Nur wenn beim Teilen durch 2 ein Rest von 1 bleibt (ungerade Zahl), wird der Text auf 'Wintersemester' geändert.
      turnusLabel = 'Wintersemester'; //notiz an mich; ws ist ungerade, ss ist gerade
    }
    console.log(`Semester ${naechsteNummer} (${turnusLabel}) angelegt.`, this.gefilterteVerfuegbareModule); //debug k
    

    const neuesSemester: SemesterInfo = {
      nummer: naechsteNummer,
      status: turnusLabel,
      richtwert_ects: 30,
    };

    this.personalSemesterListe.push(neuesSemester);
    this.personalGeplanteModuleMap[naechsteNummer] = [];
    this.selectedSemester = naechsteNummer;
  }

  /**
   * Entfernt das zuletzt hinzugefügte Semester und legt dessen geplante Module
   * wieder zurück in verfuegbareModule (in ursprünglicher Reihenfolge).
   */
  letztesSemesterEntfernen(event: Event): void {
    event.stopPropagation();
    if (this.personalSemesterListe.length === 0) {
      return;
    }

    const entferntesSemester = this.personalSemesterListe.pop()!;
    const geplanteModule = this.personalGeplanteModuleMap[entferntesSemester.nummer] || [];

    if (geplanteModule.length > 0) {
      this.verfuegbareModule.push(...geplanteModule.map((m) => ({ ...m, statusText: undefined })));
      this.sortiereVerfuegbareModule();
    }

    delete this.personalGeplanteModuleMap[entferntesSemester.nummer];

    if (this.personalSemesterListe.length > 0) {
      this.selectedSemester =
        this.personalSemesterListe[this.personalSemesterListe.length - 1].nummer;
    } else {
      this.selectedSemester = null;
    }
  }

  getGeplanteModule(semesterNummer: number | null): Modul[] {
    if (semesterNummer === null) {
      return [];
    }
    return this.aktuelleModuleMap[semesterNummer] || [];
  }

  getGeplante_ects(semesterNummer: number): number {
    return this.getGeplanteModule(semesterNummer).reduce((summe, mod) => summe + mod.ects, 0);
  }

  getFortschrittProzent(semesterNummer: number): number {
    const sem = this.aktuelleSemesterListe.find((s) => s.nummer === semesterNummer);
    const richtwert = sem ? sem.richtwert_ects : 30;
    const aktuell = this.getGeplante_ects(semesterNummer);
    return Math.min(100, (aktuell / richtwert) * 100);
  }

  modulHinzufuegen(modul: Modul): void {
    if (this.activeTab !== 'personal' || this.selectedSemester === null) {
      return;
    }

    this.verfuegbareModule = this.verfuegbareModule.filter(
      (m) => m.modul_nummer !== modul.modul_nummer,
    );

    if (!this.personalGeplanteModuleMap[this.selectedSemester]) {
      this.personalGeplanteModuleMap[this.selectedSemester] = [];
    }

    this.personalGeplanteModuleMap[this.selectedSemester].push({
      ...modul,
      statusText: 'belegt / geplant',
    });
  }

  offenesNotenModul: string | null = null;
  notenOptionen: number[] = [1.0, 1.3, 1.7, 2.0, 2.3, 2.7, 3.0, 3.3, 3.7, 4.0]; //5.0 kann nicht gesetzt werden

  // Öffnet das Dropdown für genau dieses Modul (oder schließt es wieder)
  toggleNotenDropdown(modulNummer: string): void {
    this.offenesNotenModul = this.offenesNotenModul === modulNummer ? null : modulNummer;
  }

  // Übernimmt die angeklickte Note ins Modul und schließt das Dropdown
  // wenn Note eingetragen wurde steht im Modul-Objekt die Note und der Status wird auf "bestanden" oder "nicht bestanden" gesetzt
  noteSetzen(modul: Modul, note: number | undefined): void {
    modul.note = note;

    if (note === undefined) {
      modul.statusText = 'belegt / geplant';
    } else {
      modul.statusText = note <= 4.0 ? 'bestanden' : 'nicht bestanden';
    }

    this.offenesNotenModul = null;
  }

  modulEntfernen(modul: Modul): void {
    if (this.activeTab !== 'personal' || this.selectedSemester === null) {
      return;
    }

    const aktuelleListe = this.personalGeplanteModuleMap[this.selectedSemester] || [];
    this.personalGeplanteModuleMap[this.selectedSemester] = aktuelleListe.filter(
      (m) => m.modul_nummer !== modul.modul_nummer,
    );

    this.verfuegbareModule.push({
      ...modul,
      statusText: undefined,
    });
    this.sortiereVerfuegbareModule();
  }

  private sortiereVerfuegbareModule(): void {
    const reihenfolgeMap = new Map(this.alleModuleBasis.map((m, index) => [m.modul_nummer, index]));
    this.verfuegbareModule.sort(
      (a, b) =>
        (reihenfolgeMap.get(a.modul_nummer) ?? 999) - (reihenfolgeMap.get(b.modul_nummer) ?? 999),
    );
  }
}
