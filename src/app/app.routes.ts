import {Routes} from '@angular/router';
import {Sidebar} from './sidebar/sidebar';
import {Startseite } from './startseite/startseite';
import {Profil} from './profil/profil';
import {Stundenplan} from './stundenplan/stundenplan';
import {Moduluebersicht} from './moduluebersicht/moduluebersicht';
import {Stupo} from './stupo/stupo';
import {Kalender} from './kalender/kalender';
import { Tipps } from './tipps/tipps';
import {Statistikstudi} from './statistikstudi/statistikstudi';
import {Statistikprof} from './statistikprof/statistikprof';
import {Login} from './login/login';
import {Registrierung} from './registrierung/registrierung';
import {Einstellungen} from './einstellungen/einstellungen';

export const routes: Routes = [
    {path: '', component: Startseite},
    {path: 'sidebar', component: Sidebar},
    {path: 'startseite', component: Startseite},
    {path: 'profil', component: Profil},
    {path: 'stundenplan', component: Stundenplan},
    {path: 'moduluebersicht', component: Moduluebersicht},
    {path: 'stupo', component: Stupo},
    {path: 'kalender', component: Kalender},
    {path: 'tipps', component: Tipps},
    {path: 'statistikstudi', component: Statistikstudi},
    {path: 'statistikprof', component: Statistikprof},
    {path: 'login', component: Login},
    {path: 'registrierung', component: Registrierung},
    {path: 'einstellungen', component: Einstellungen}

];