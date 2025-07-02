import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./profil/profil.component').then((m) => m.ProfilComponent),
      },
      {
        path: 'location/:id',
        loadComponent: () =>
          import('./location-detail/location-detail.component').then((m) => m.LocationDetailComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
      }
    ],
  },
];
