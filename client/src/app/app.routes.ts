import { Routes } from '@angular/router';
import {EnregistrementComponent} from './enregistrement/enregistrement.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'enregistrement', component: EnregistrementComponent },
  {path: 'login', component: LoginComponent },
];
