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
import {AuthGuard} from './guards/auth.guard';
import {AgentGuard} from './guards/agent.guard';
import {EditLocationComponent} from './location/edit-location/edit-location.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full', data: { breadcrumb: 'Accueil' } },
  { path: 'enregistrement', component: EnregistrementComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Profil' } },
  { path: 'agent', component: GestionAgentComponent, canActivate: [AgentGuard], data: { breadcrumb: 'Profil agent' } },
  { path: 'client/:id/edit', component: ClientEditComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Modifier client' } },
  { path: 'search', component: ListeVoitureComponent, data: { breadcrumb: 'Liste des voitures' } },
  { path: 'voiture/:id', component: DetailVoitureComponent, data: { breadcrumb: 'Détails voiture' } },
  { path: 'voiture/:id/rent', component: ReservationFormComponent, data: { breadcrumb: 'Réserver' } },
  { path: 'location/:id', component: DetailsLocationComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Détails location' } },
  { path: 'retrait/:id/edit', component: RetraitComponent, data: { breadcrumb: 'Modifier retrait' } },
  { path: 'retour/:id/edit', component: RetourComponent, data: { breadcrumb: 'Modifier retour' } },
  { path: 'location/edit/:id', component: EditLocationComponent, data: { breadcrumb: 'Modifier location' } }
];

