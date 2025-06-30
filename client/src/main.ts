import { provideRouter, Routes } from '@angular/router';
import { EnregistrementComponent } from './app/enregistrement/enregistrement.component';
<<<<<<< HEAD
import { HomepageComponent } from './app/homepage/homepage.component';
import { LoginComponent } from './app/login/login.component';
import { ProfilComponent } from './app/profil/profil.component';
import { ListeVoitureComponent } from './app/liste-voiture/liste-voiture.component';
import { ClientEditComponent } from './app/client-edit/client-edit.component';
import { DetailVoitureComponent } from './app/detail-voiture/detail-voiture.component';
import { GarantieComponent } from './app/garantie/garantie.component'; // ✅ ajout

import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
=======
import {provideHttpClient} from '@angular/common/http';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {HomepageComponent} from './app/homepage/homepage.component';
import {LoginComponent} from './app/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ProfilComponent} from './app/profil/profil.component';
import {ListeVoitureComponent} from './app/liste-voiture/liste-voiture.component';
import {ClientEditComponent} from './app/client-edit/client-edit.component';
import {DetailVoitureComponent} from './app/detail-voiture/detail-voiture.component';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ReservationFormComponent} from './app/reservation-form/reservation-form.component';
>>>>>>> origin/dev

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'enregistrement', component: EnregistrementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent },
<<<<<<< HEAD
  { path: 'client/:id/edit', component: ClientEditComponent },
  { path: 'search', component: ListeVoitureComponent },
  { path: 'voiture/:id', component: DetailVoitureComponent },
  { path: 'garantie', component: GarantieComponent },

  // ✅ Ajout correct pour OptionComponent (standalone)
  { path: 'options', loadComponent: () => import('./app/option/option.component').then(m => m.OptionComponent) }
=======
  { path: 'client/:id/edit', component: ClientEditComponent},
  { path: 'voiture/:id', component: DetailVoitureComponent},
  { path: 'voiture/:id/rent', component: ReservationFormComponent},
  { path: '', component: HomepageComponent },
>>>>>>> origin/dev
];


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideNativeDateAdapter()
  ],
});
