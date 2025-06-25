import { Routes } from '@angular/router';
import {EnregistrementComponent} from './enregistrement/enregistrement.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {ProfilComponent} from './profil/profil.component';
import {ListeVoitureComponent} from './liste-voiture/liste-voiture.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'enregistrement', component: EnregistrementComponent },
  {path: 'login', component: LoginComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'search', component: ListeVoitureComponent},
];
