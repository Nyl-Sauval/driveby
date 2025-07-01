import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';


import { AppComponent } from './app/app.component';
import { HomepageComponent } from './app/homepage/homepage.component';
import { LoginComponent } from './app/login/login.component';
import { EnregistrementComponent } from './app/enregistrement/enregistrement.component';
import { ProfilComponent } from './app/profil/profil.component';
import { ListeVoitureComponent } from './app/liste-voiture/liste-voiture.component';
import { ClientEditComponent } from './app/client-edit/client-edit.component';
import { DetailVoitureComponent } from './app/detail-voiture/detail-voiture.component';
import { GarantieComponent } from './app/garantie/garantie.component';
import { ReservationFormComponent } from './app/reservation-form/reservation-form.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'enregistrement', component: EnregistrementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'client/:id/edit', component: ClientEditComponent },
  { path: 'search', component: ListeVoitureComponent },
  { path: 'voiture/:id', component: DetailVoitureComponent },
  { path: 'voiture/:id/rent', component: ReservationFormComponent },
  { path: 'garantie', component: GarantieComponent },
  {
    path: 'options',
    loadComponent: () =>
      import('./app/option/option.component').then(m => m.OptionComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideNativeDateAdapter()
  ]
});
