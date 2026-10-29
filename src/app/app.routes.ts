import { Routes } from '@angular/router';
import {Startseite } from './startseite/startseite';
import {Profil} from './profil/profil';
import {Stundenplan} from './stundenplan/stundenplan';
import {Moduluebersicht} from './moduluebersicht/moduluebersicht';
import {Stupo} from './stupo/stupo';
import {Statistikstudi} from './statistikstudi/statistikstudi';
import {Statistikprof} from './statistikprof/statistikprof';
import {Login} from './login/login';
import {Registrierung} from './registrierung/registrierung';
import {Einstellungen} from './einstellungen/einstellungen';

export const routes: Routes = [
    {path: '', component: Startseite},
    {path: 'profil', component: Profil},
    {path: 'stundenplan', component: Stundenplan},
    {path: 'moduluebersicht', component: Moduluebersicht},
    {path: 'stupo', component: Stupo},
    {path: 'statistikstudi', component: Statistikstudi},
    {path: 'statistikprof', component: Statistikprof},
    {path: 'login', component: Login},
    {path: 'registrierung', component: Registrierung},
    {path: 'einstellungen', component: Einstellungen}

];