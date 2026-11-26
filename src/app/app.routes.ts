import { authGuard } from './auth-guard';
import {Routes} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar';
import {Startseite } from './startseite/startseite';
import {SidebarRechtsComponent} from './sidebar-rechts/sidebar-rechts';
import {Profil} from './profil/profil';
import {Semesterplan} from './semesterplan/semesterplan';
import {Noten} from './noten/noten';
import {Moduluebersicht} from './moduluebersicht/moduluebersicht';
import {Stupo} from './stupo/stupo';
import {Kalender} from './kalender/kalender';
import {Tipps} from './tipps/tipps';
import {Statistikstudi} from './statistikstudi/statistikstudi';
import {Statistikprof} from './statistikprof/statistikprof';
import {Login} from './login/login';
import {Registrierung} from './registrierung/registrierung';
import {Einstellungen} from './einstellungen/einstellungen';
import {Moduldetails} from './moduldetails/moduldetails';

export const routes: Routes = [
     // oeffentliche Routen
    {path: '', component: Startseite},
    {path: 'sidebar', component: SidebarComponent},
    {path: 'sidebar-rechts', component: SidebarRechtsComponent},
    {path: 'startseite', component: Startseite},
    {path: 'registrierungsformular', component: Registrierung},
    {path: 'login', component: Login},
    {path: 'stupo', component: Stupo},
    {path: 'moduluebersicht', component: Moduluebersicht},
    {path: 'moduldetails/:id', component: Moduldetails},

    // geschuetzte Routen( nur fuer angemeldete User )
    {path: 'profil', component: Profil, canActivate: [authGuard]},
    {path: 'semesterplan', component: Semesterplan, canActivate: [authGuard]},
    {path: 'noten', component: Noten, canActivate: [authGuard]},
    {path: 'kalender', component: Kalender, canActivate: [authGuard]},
    {path: 'tipps', component: Tipps, canActivate: [authGuard]},
    {path: 'statistikstudi', component: Statistikstudi, canActivate: [authGuard]},
    {path: 'statistikprof', component: Statistikprof, canActivate: [authGuard]},
    {path: 'einstellungen', component: Einstellungen, canActivate: [authGuard]},
    {path: 'einstellungen', component: Einstellungen},
    {path: 'moduldetails/:id', component: Moduldetails}
];

