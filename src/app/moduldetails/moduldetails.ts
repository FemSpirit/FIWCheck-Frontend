import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModulDetail } from './moduldetails.model';
import { ModuldetailsService } from './moduldetails.service';
import { RouterLink } from '@angular/router';

@Component
({
  imports: [RouterLink],
  selector: 'app-moduldetails',
  styleUrl: './moduldetails.css',
  templateUrl: './moduldetails.html',
})
export class Moduldetails 
{
  modul: ModulDetail | undefined;
  fehlerMeldung: string | null = null;

  constructor
  (private route: ActivatedRoute,
  private moduldetailsService: ModuldetailsService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const modulId = Number(params['id']);
      this.modul = this.moduldetailsService.getModulById(modulId);

      if (!this.modul) {
        this.fehlerMeldung = 'Modul wurde nicht gefunden.';
      }
    });
  }
}