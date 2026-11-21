import { Component } from '@angular/core';

export interface Module
{
  id: String;
  name: string;
  semester: number;
  ECTS: number;
  status?: "offen" | "belegt" | "bestanden" | "nicht_bestanden" | "vorgemerkt";
  fachgruppe: "Informatik" | "Wirtschaft" | "Praxis" | "Fachuebergreifend"
  groesse?: number; // Optional: z.B. 2, 3.5, 4 oder 0.5
}

type ReiterTyp = 'moduleGeneral' | 'moduleEigene' | 'stupo';
@Component({
  imports: [],
  selector: 'app-moduluebersicht',
  styleUrl: './moduluebersicht.css',
  templateUrl: './moduluebersicht.html',
})


export class Moduluebersicht 
{
//--------hier beginnen die configs meines ersten Reiters auf der Seite--------->
  aktiverReiter: ReiterTyp = 'moduleGeneral';

  waehleReiter(reiter: ReiterTyp): void 
  {
  this.aktiverReiter = reiter;
  }

//------------so lasse ich die fachgruppen hervorheben---------------
  hervorgehobeneFachgruppe: Module['fachgruppe'] | null = null;

  setzeHervorgehobeneFachgruppe(fachgruppe: Module['fachgruppe']): void 
  {
  this.hervorgehobeneFachgruppe = fachgruppe;
  }

  leereHervorgehobeneFachgruppe(): void 
  {
  this.hervorgehobeneFachgruppe = null;
  }
//-------------- Meine schönen Mockdaten als Liste---------->
  modules: Module[] = [
    {
      id: "B11",
      name: "Programmieren 1",
      semester: 1,
      ECTS: 6,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B12",
      name: "Rechnerarchitektur/ Betriebssysteme",
      semester: 1,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
       {
      id: "B13",
      name: "Grundlegende Konzepte der Informatik",
      semester: 1,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
       {
      id: "B14",
      name: "BWL 1: Grundlagen der BWL",
      semester: 1,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      id: "B15",
      name: "Mathematik 1",
      semester: 1,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B16",
      name: "1. Fremdsprache 1",
      semester: 1,
      ECTS: 4,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    //---------2. Fachsemester----------------
    {
      id: "B21",
      name: "Programmieren 2",
      semester: 2,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B22",
      name: "Mathematik 2",
      semester: 2,
      ECTS: 6,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B23",
      name: "Software-Engineering 1",
      semester: 2,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B24",
      name: "Webtechnologien",
      semester: 2,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B25",
      name: "BWL 2: Rechnungswesen",
      semester: 2,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      id: "B26",
      name: "1. Fremdsprache 2",
      semester: 2,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    //---------3. Fachsemester----------------
    {
      id: "B31",
      name: "Data Science",
      semester: 3,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B32",
      name: "Software-Engineering 2",
      semester: 3,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B33",
      name: "Datenbanksysteme",
      semester: 3,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B34",
      name: "Softwareentwicklungsprojekt",
      semester: 3,
      ECTS: 10,
      status: "offen",
      fachgruppe: "Informatik",
      groesse: 2
    },
    {
      id: "B35",
      name: "Projektmanagement",
      semester: 3,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    //---------4. Fachsemester----------------
     {
      id: "B41",
      name: "Wahlpflichtmodul (Wirtschafts-)Informatik 1",
      semester: 4,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
     {
      id: "B42",
      name: "Wissenschaftliches Schreiben",
      semester: 4,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
     {
      id: "B43",
      name: "Fachpraktikum",
      semester: 4,
      ECTS: 20,
      status: "offen",
      fachgruppe: "Praxis",
      groesse: 4
    },
    //---------5. Fachsemester----------------
    {
      id: "B51",
      name: "Human Computer Interaction",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B52",
      name: "Verteilte Systeme",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B53",
      name: "Datenschutz und Datensicherheit",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      id: "B54",
      name: "Wahlpflichtmodul (Wirtschafts-)Informatik 2 ",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      id: "B55",
      name: "Informatik und Gesellschaft",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    {
      id: "B56",
      name: "Projekte in der Wirtschaft ",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Praxis"
    },
    //---------6. Fachsemester----------------
     {
      id: "B61",
      name: "Modellierung von Informationssystemen ",
      semester: 6,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
     {
      id: "B62",
      name: "BWL 3: Berufspraxis IT-Wirtschaft",
      semester: 6,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"

    },
     {
      id: "B63",
      name: "AWE-Modul 1",
      semester: 6,
      ECTS: 2,
      status: "offen",
      fachgruppe: "Fachuebergreifend",
      groesse: 0.5
    },
     {
      id: "B64",
      name: "AWE-Modul 2",
      semester: 6,
      ECTS: 2,
      status: "offen",
      fachgruppe: "Fachuebergreifend",
      groesse: 0.5
    },
     {
      id: "B65",
      name: "Bachelorseminar und Abschlusskolloquium ",
      semester: 6,
      ECTS: 3,
      status: "offen",
      fachgruppe: "Praxis"
    },
     {
      id: "B66",
      name: "Bachelorarbeit",
      semester: 6,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Praxis",
      groesse: 2
    },
  ];
  semester1 = this.modules.filter(m => m.semester === 1);
  semester2 = this.modules.filter(m => m.semester === 2);
  semester3 = this.modules.filter(m => m.semester === 3);
  semester4 = this.modules.filter(m => m.semester === 4);
  semester5 = this.modules.filter(m => m.semester === 5);
  semester6 = this.modules.filter(m => m.semester === 6);

//-------toll so kann ich die Größe der Kacheln anpassen!--------
  getModuleWidth(groesse?: number): string 
  {
  if (groesse==undefined)
  {
    return '131px';
  }
  else
  {
    return (groesse * 131) + (groesse - 1) * 15 + 'px';
  }
}
//--------------------------------------------------Mochdaten------------------------------->
//--------------Zweiter Reier "Meine Module"----------------->

meineModule: Module[] = [ 

    {
      id: "B11",
      name: "Programmieren 1",
      semester: 1,
      ECTS: 6,
      fachgruppe: "Informatik"
    },
    {
      id: "B12",
      name: "Rechnerarchitektur/ Betriebssysteme",
      semester: 1,
      ECTS: 5,
      status: "bestanden",
      fachgruppe: "Informatik"
    },
       {
      id: "B13",
      name: "Grundlegende Konzepte der Informatik",
      semester: 1,
      ECTS: 5,
      status: "bestanden",
      fachgruppe: "Informatik"
    },
       {
      id: "B14",
      name: "BWL 1: Grundlagen der BWL",
      semester: 1,
      ECTS: 5,
      status: "belegt",
      fachgruppe: "Wirtschaft"
    },
    {
      id: "B25",
      name: "BWL 2: Rechnungswesen",
      semester: 2,
      ECTS: 5,
      status: "nicht_bestanden",
      fachgruppe: "Wirtschaft"
    },
    {
      id: "B26",
      name: "1. Fremdsprache 2",
      semester: 2,
      ECTS: 5,
      status: "vorgemerkt",
      fachgruppe: "Fachuebergreifend"
    },
    {
      id: "B31",
      name: "Data Science",
      semester: 3,
      ECTS: 5,
      status: "vorgemerkt",
      fachgruppe: "Informatik"
    },
    {
      id: "B32",
      name: "Software-Engineering 2",
      semester: 3,
      ECTS: 5,
      status: "nicht_bestanden",
      fachgruppe: "Informatik"
    },
      {
      id: "B54",
      name: "Wahlpflichtmodul (Wirtschafts-)Informatik 2 ",
      semester: 5,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      id: "B55",
      name: "Informatik und Gesellschaft",
      semester: 5,
      ECTS: 5,
      status: "belegt",
      fachgruppe: "Fachuebergreifend"
    },
    {
      id: "B56",
      name: "Projekte in der Wirtschaft ",
      semester: 5,
      ECTS: 5,
      status: "bestanden",
      fachgruppe: "Praxis"
    },
      {
      id: "B61",
      name: "Modellierung von Informationssystemen ",
      semester: 6,
      ECTS: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
     {
      id: "B62",
      name: "BWL 3: Berufspraxis IT-Wirtschaft",
      semester: 6,
      ECTS: 5,
      status: "vorgemerkt",
      fachgruppe: "Wirtschaft"

    },
     {
      id: "B63",
      name: "AWE-Modul 1",
      semester: 6,
      ECTS: 2,
      status: "belegt",
      fachgruppe: "Fachuebergreifend",
      groesse: 0.5
    },
     {
      id: "B64",
      name: "AWE-Modul 2",
      semester: 6,
      ECTS: 2,
      status: "belegt",
      fachgruppe: "Fachuebergreifend",
      groesse: 0.5
    },
     {
      id: "B65",
      name: "Bachelorseminar und Abschlusskolloquium ",
      semester: 6,
      ECTS: 3,
      status: "belegt",
      fachgruppe: "Praxis"
    },
     {
      id: "B66",
      name: "Bachelorarbeit",
      semester: 6,
      ECTS: 5,
      status: "belegt",
      fachgruppe: "Praxis",
      groesse: 2
    }
  //------meine schönen semesterzeilen---------->
  ];
  eigeneSemester1 = this.meineModule.filter(m => m.semester === 1);
  eigeneSemester2 = this.meineModule.filter(m => m.semester === 2);
  eigeneSemester3 = this.meineModule.filter(m => m.semester === 3);
  eigeneSemester4 = this.meineModule.filter(m => m.semester === 4);
  eigeneSemester5 = this.meineModule.filter(m => m.semester === 5);
  eigeneSemester6 = this.meineModule.filter(m => m.semester === 6);
  eigeneSemester7 = this.meineModule.filter(m => m.semester === 7);
  eigeneSemester8 = this.meineModule.filter(m => m.semester === 8);

  //--------hier sage ich meinem code, dass sollte das gewählte modul kein status haben "offen" gilt ----->
  statusOderOffen(modul: Module) 
  {
    return modul.status ?? 'offen';
  }

  //------------------Hier möchte ich wieder meinen code schön hervorheben-------->
  hervorgehobeneStatus: Module['status'] | null = null;

  setzeHervorgehobeneStatus(status: Module['status']): void 
  {
  this.hervorgehobeneStatus = status;
  }

  leereHervorgehobeneStatus(): void 
  {
  this.hervorgehobeneStatus = null;
  }
}
