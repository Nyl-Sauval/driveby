import { Routes } from '@angular/router';
import {EnregistrementComponent} from './enregistrement/enregistrement.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {ProfilComponent} from './profil/profil.component';
import {ListeVoitureComponent} from './liste-voiture/liste-voiture.component';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {DetailVoitureComponent} from './detail-voiture/detail-voiture.component';
import {ReservationFormComponent} from './reservation-form/reservation-form.component';
import {GestionAgentComponent} from './gestion-agent/gestion-agent.component';
import {DetailsLocationComponent} from './location/details-location/details-location.component';
import {RetraitComponent} from './agent/retrait/retrait.component';
import {RetourComponent} from './agent/retour/retour.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'enregistrement', component: EnregistrementComponent },
  {path: 'login', component: LoginComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'agent', component: GestionAgentComponent },
  {path: 'client/:id/edit', component: ClientEditComponent},
  {path: 'search', component: ListeVoitureComponent},
  {path: 'voiture/:id', component: DetailVoitureComponent},
  {path: 'voiture/:id/rent', component: ReservationFormComponent},
  {path: 'location/:id', component: DetailsLocationComponent},
  {path: 'retrait/:id', component: RetraitComponent},
];
