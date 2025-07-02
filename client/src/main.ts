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
import {EditLocationComponent} from './app/location/edit-location/edit-location.component';
import { GarantieComponent } from './app/garantie/garantie.component'; // ✅ ajout


const routes: Routes = [
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
  { path: 'location/edit/:id', component: EditLocationComponent, data: { breadcrumb: 'Modifier location' } },

  { path: 'garantie', component: GarantieComponent },

  // ✅ Ajout correct pour OptionComponent (standalone)
  { path: 'options', loadComponent: () => import('./app/option/option.component').then(m => m.OptionComponent) }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideNativeDateAdapter()
  ]
});
