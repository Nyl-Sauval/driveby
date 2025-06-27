import { provideRouter, Routes } from '@angular/router';
import { EnregistrementComponent } from './app/enregistrement/enregistrement.component';
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

const routes: Routes = [
  { path: 'enregistrement', component: EnregistrementComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: ListeVoitureComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'client/:id/edit', component: ClientEditComponent},
  { path: 'voiture/:id', component: DetailVoitureComponent},
  { path: 'voiture/:id/rent', component: ReservationFormComponent},
  { path: '', component: HomepageComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideNativeDateAdapter()
  ],
});
