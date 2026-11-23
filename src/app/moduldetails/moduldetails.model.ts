export interface ModulDetail 
{
  modul_id: number;
  modulnummer: string;
  bezeichnung: string;
  beschreibung: string;
  ects: number;
  form: string;
  sws: string;
  pflichtart: boolean;
  angebotssemester: string;
  empfohlendesSemester: number;
  fliesstInGesamtnote: number;
  fliesstInModulgruppeNote: number;
  zeugnisrelevant: boolean;
  gesamtnotenrelevant: boolean;
  fachgruppe: string;
  raster_groesse_vz: number;
  stupo_id: number;
  modulgruppe_id: number;
}
