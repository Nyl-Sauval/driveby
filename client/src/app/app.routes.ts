import { Routes } from '@angular/router';
import {EnregistrementComponent} from './enregistrement/enregistrement.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {ProfilComponent} from './profil/profil.component';
import {ListeVoitureComponent} from './liste-voiture/liste-voiture.component';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {DetailVoitureComponent} from './detail-voiture/detail-voiture.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'enregistrement', component: EnregistrementComponent },
  {path: 'login', component: LoginComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'client/:id/edit', component: ClientEditComponent},
  {path: 'search', component: ListeVoitureComponent},
  {path: 'voiture/:id', component: DetailVoitureComponent}
];
