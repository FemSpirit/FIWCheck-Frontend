import { authGuard } from './auth-guard';
import {Routes} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar';
import { SidebarRechtsComponent } from './sidebar-rechts/sidebar-rechts';
import {Startseite } from './startseite/startseite';
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
    {path: 'einstellungen', component: Einstellungen},
    {path: 'moduldetails/:id', component: Moduldetails}
];
