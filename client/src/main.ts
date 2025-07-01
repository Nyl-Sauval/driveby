import { provideRouter, Routes } from '@angular/router';
import { EnregistrementComponent } from './app/enregistrement/enregistrement.component';
import {provideHttpClient} from '@angular/common/http';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {HomepageComponent} from './app/homepage/homepage.component';
import {LoginComponent} from './app/login/login.component';
import {ProfilComponent} from './app/profil/profil.component';
import {ListeVoitureComponent} from './app/liste-voiture/liste-voiture.component';
import {ClientEditComponent} from './app/client-edit/client-edit.component';
import {DetailVoitureComponent} from './app/detail-voiture/detail-voiture.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ReservationFormComponent} from './app/reservation-form/reservation-form.component';
import {GestionAgentComponent} from './app/gestion-agent/gestion-agent.component';
import {DetailsLocationComponent} from './app/location/details-location/details-location.component';
import {RetraitComponent} from './app/agent/retrait/retrait.component';
import {RetourComponent} from './app/agent/retour/retour.component';
import {AuthGuard} from './app/guards/auth.guard';
import {AgentGuard} from './app/guards/agent.guard';

const routes: Routes = [
  { path: 'enregistrement', component: EnregistrementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: ListeVoitureComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'agent', component: GestionAgentComponent, canActivate: [AgentGuard] },
  { path: 'client/:id/edit', component: ClientEditComponent, canActivate: [AuthGuard] },
  { path: 'voiture/:id', component: DetailVoitureComponent},
  { path: 'voiture/:id/rent', component: ReservationFormComponent},
  { path: 'location/:id', component: DetailsLocationComponent},
  { path: 'retrait/:id/edit', component: RetraitComponent},
  { path: 'retour/:id/edit', component: RetourComponent},
  { path: 'location/:id', component: DetailsLocationComponent, canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideNativeDateAdapter()
  ],
});
