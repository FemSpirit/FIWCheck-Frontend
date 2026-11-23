import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


export interface Module
{
  modul_id?: number;
  modulnummer?: string;
  bezeichnung: string;
  semester: number;
  ects: number;
  status?: "offen" | "belegt" | "bestanden" | "nicht_bestanden" | "vorgemerkt";
  fachgruppe: "Informatik" | "Wirtschaft" | "Praxis" | "Fachuebergreifend";
  raster_groesse_vz?: number;
}

type ReiterTyp = 'moduleGeneral' | 'moduleEigene' | 'stupo';
@Component({
  imports: [RouterLink],
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
      modul_id: 1,
      modulnummer: "B11",
      bezeichnung: "Programmieren 1",
      semester: 1,
      ects: 6,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 2,
      modulnummer: "B12",
      bezeichnung: "Rechnerarchitektur/ Betriebssysteme",
      semester: 1,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 3,
      modulnummer: "B13",
      bezeichnung: "Grundlegende Konzepte der Informatik",
      semester: 1,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 4,
      modulnummer: "B14",
      bezeichnung: "BWL 1: Grundlagen der BWL",
      semester: 1,
      ects: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 5,
      modulnummer: "B15",
      bezeichnung: "Mathematik 1",
      semester: 1,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 6,
      modulnummer: "B16",
      bezeichnung: "1. Fremdsprache 1",
      semester: 1,
      ects: 4,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    //---------2. Fachsemester----------------
    {
      modul_id: 7,
      modulnummer: "B21",
      bezeichnung: "Programmieren 2",
      semester: 2,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 8,
      modulnummer: "B22",
      bezeichnung: "Mathematik 2",
      semester: 2,
      ects: 6,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 9,
      modulnummer: "B23",
      bezeichnung: "Software-Engineering 1",
      semester: 2,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 10,
      modulnummer: "B24",
      bezeichnung: "Webtechnologien",
      semester: 2,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 11,
      modulnummer: "B25",
      bezeichnung: "BWL 2: Rechnungswesen",
      semester: 2,
      ects: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 12,
      modulnummer: "B26",
      bezeichnung: "1. Fremdsprache 2",
      semester: 2,
      ects: 5,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    //---------3. Fachsemester----------------
    {
      modul_id: 13,
      modulnummer: "B31",
      bezeichnung: "Data Science",
      semester: 3,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 14,
      modulnummer: "B32",
      bezeichnung: "Software-Engineering 2",
      semester: 3,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 15,
      modulnummer: "B33",
      bezeichnung: "Datenbanksysteme",
      semester: 3,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 16,
      modulnummer: "B34",
      bezeichnung: "Softwareentwicklungsprojekt",
      semester: 3,
      ects: 10,
      status: "offen",
      fachgruppe: "Informatik",
      raster_groesse_vz: 2
    },
    {
      modul_id: 17,
      modulnummer: "B35",
      bezeichnung: "Projektmanagement",
      semester: 3,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    //---------4. Fachsemester----------------
    {
      modul_id: 18,
      modulnummer: "B41",
      bezeichnung: "Wahlpflichtmodul (Wirtschafts-)Informatik 1",
      semester: 4,
      ects: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 19,
      modulnummer: "B42",
      bezeichnung: "Wissenschaftliches Schreiben",
      semester: 4,
      ects: 5,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    {
      modul_id: 20,
      modulnummer: "B43",
      bezeichnung: "Fachpraktikum",
      semester: 4,
      ects: 20,
      status: "offen",
      fachgruppe: "Praxis",
      raster_groesse_vz: 4
    },
    //---------5. Fachsemester----------------
    {
      modul_id: 21,
      modulnummer: "B51",
      bezeichnung: "Human Computer Interaction",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 22,
      modulnummer: "B52",
      bezeichnung: "Verteilte Systeme",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 23,
      modulnummer: "B53",
      bezeichnung: "Datenschutz und Datensicherheit",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 24,
      modulnummer: "B54",
      bezeichnung: "Wahlpflichtmodul (Wirtschafts-)Informatik 2",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 25,
      modulnummer: "B55",
      bezeichnung: "Informatik und Gesellschaft",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Fachuebergreifend"
    },
    {
      modul_id: 26,
      modulnummer: "B56",
      bezeichnung: "Projekte in der Wirtschaft",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Praxis"
    },
    //---------6. Fachsemester----------------
    {
      modul_id: 27,
      modulnummer: "B61",
      bezeichnung: "Modellierung von Informationssystemen",
      semester: 6,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 28,
      modulnummer: "B62",
      bezeichnung: "BWL 3: Berufspraxis IT-Wirtschaft",
      semester: 6,
      ects: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 29,
      modulnummer: "B63",
      bezeichnung: "AWE-Modul 1",
      semester: 6,
      ects: 2,
      status: "offen",
      fachgruppe: "Fachuebergreifend",
      raster_groesse_vz: 0.5
    },
    {
      modul_id: 30,
      modulnummer: "B64",
      bezeichnung: "AWE-Modul 2",
      semester: 6,
      ects: 2,
      status: "offen",
      fachgruppe: "Fachuebergreifend",
      raster_groesse_vz: 0.5
    },
    {
      modul_id: 31,
      modulnummer: "B65",
      bezeichnung: "Bachelorseminar und Abschlusskolloquium",
      semester: 6,
      ects: 3,
      status: "offen",
      fachgruppe: "Praxis"
    },
    {
      modul_id: 32,
      modulnummer: "B66",
      bezeichnung: "Bachelorarbeit",
      semester: 6,
      ects: 5,
      status: "offen",
      fachgruppe: "Praxis",
      raster_groesse_vz: 2
    },
  ];
  semester1 = this.modules.filter(m => m.semester === 1);
  semester2 = this.modules.filter(m => m.semester === 2);
  semester3 = this.modules.filter(m => m.semester === 3);
  semester4 = this.modules.filter(m => m.semester === 4);
  semester5 = this.modules.filter(m => m.semester === 5);
  semester6 = this.modules.filter(m => m.semester === 6);

//-------toll so kann ich die Größe der Kacheln anpassen!--------
  getModuleWidth(rasterGroesseVz?: number): string 
  {
  if (rasterGroesseVz==undefined)
  {
    return '131px';
  }
  else
  {
    return (rasterGroesseVz * 131) + (rasterGroesseVz - 1) * 15 + 'px';
  }
}
//--------------------------------------------------Mochdaten------------------------------->
//--------------Zweiter Reier "Meine Module"----------------->

meineModule: Module[] = [ 

    {
      modul_id: 1,
      modulnummer: "B11",
      bezeichnung: "Programmieren 1",
      semester: 1,
      ects: 6,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 2,
      modulnummer: "B12",
      bezeichnung: "Rechnerarchitektur/ Betriebssysteme",
      semester: 1,
      ects: 5,
      status: "bestanden",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 3,
      modulnummer: "B13",
      bezeichnung: "Grundlegende Konzepte der Informatik",
      semester: 1,
      ects: 5,
      status: "bestanden",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 4,
      modulnummer: "B14",
      bezeichnung: "BWL 1: Grundlagen der BWL",
      semester: 1,
      ects: 5,
      status: "belegt",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 11,
      modulnummer: "B25",
      bezeichnung: "BWL 2: Rechnungswesen",
      semester: 2,
      ects: 5,
      status: "nicht_bestanden",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 12,
      modulnummer: "B26",
      bezeichnung: "1. Fremdsprache 2",
      semester: 2,
      ects: 5,
      status: "vorgemerkt",
      fachgruppe: "Fachuebergreifend"
    },
    {
      modul_id: 13,
      modulnummer: "B31",
      bezeichnung: "Data Science",
      semester: 3,
      ects: 5,
      status: "vorgemerkt",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 14,
      modulnummer: "B32",
      bezeichnung: "Software-Engineering 2",
      semester: 3,
      ects: 5,
      status: "nicht_bestanden",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 24,
      modulnummer: "B54",
      bezeichnung: "Wahlpflichtmodul (Wirtschafts-)Informatik 2",
      semester: 5,
      ects: 5,
      status: "offen",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 25,
      modulnummer: "B55",
      bezeichnung: "Informatik und Gesellschaft",
      semester: 5,
      ects: 5,
      status: "belegt",
      fachgruppe: "Fachuebergreifend"
    },
    {
      modul_id: 26,
      modulnummer: "B56",
      bezeichnung: "Projekte in der Wirtschaft",
      semester: 5,
      ects: 5,
      status: "bestanden",
      fachgruppe: "Praxis"
    },
    {
      modul_id: 27,
      modulnummer: "B61",
      bezeichnung: "Modellierung von Informationssystemen",
      semester: 6,
      ects: 5,
      status: "offen",
      fachgruppe: "Informatik"
    },
    {
      modul_id: 28,
      modulnummer: "B62",
      bezeichnung: "BWL 3: Berufspraxis IT-Wirtschaft",
      semester: 6,
      ects: 5,
      status: "vorgemerkt",
      fachgruppe: "Wirtschaft"
    },
    {
      modul_id: 29,
      modulnummer: "B63",
      bezeichnung: "AWE-Modul 1",
      semester: 6,
      ects: 2,
      status: "belegt",
      fachgruppe: "Fachuebergreifend",
      raster_groesse_vz: 0.5
    },
    {
      modul_id: 30,
      modulnummer: "B64",
      bezeichnung: "AWE-Modul 2",
      semester: 6,
      ects: 2,
      status: "belegt",
      fachgruppe: "Fachuebergreifend",
      raster_groesse_vz: 0.5
    },
    {
      modul_id: 31,
      modulnummer: "B65",
      bezeichnung: "Bachelorseminar und Abschlusskolloquium",
      semester: 6,
      ects: 3,
      status: "belegt",
      fachgruppe: "Praxis"
    },
    {
      modul_id: 32,
      modulnummer: "B66",
      bezeichnung: "Bachelorarbeit",
      semester: 6,
      ects: 5,
      status: "belegt",
      fachgruppe: "Praxis",
      raster_groesse_vz: 2
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