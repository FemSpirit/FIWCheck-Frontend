import { Injectable } from '@angular/core';
import { ModulDetail } from './moduldetails.model';

@Injectable({
  providedIn: 'root'
})
export class ModuldetailsService {
  private module: ModulDetail[] = [
    {
      modul_id: 1,
      modulnummer: 'b11',
      bezeichnung: 'Programmieren 1',
      beschreibung: 'Einführung in Variablen, Kontrollstrukturen und Funktionen.',
      ects: 5,
      form: 'Vorlesung',
      sws: '4 SWS',
      pflichtart: true,
      angebotssemester: 'WiSe',
      empfohlendesSemester: 1,
      fliesstInGesamtnote: 1,
      fliesstInModulgruppeNote: 1,
      zeugnisrelevant: true,
      gesamtnotenrelevant: true,
      fachgruppe: 'Informatik',
      raster_groesse_vz: 1.0,
      stupo_id: 10,
      modulgruppe_id: 100
    }
  ];

  constructor() {}

  getModulById(id: number): ModulDetail | undefined {
    return this.module.find((m) => m.modul_id === id);
  }
}