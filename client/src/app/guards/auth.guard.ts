import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.auth.checkSession().pipe(
      map(() => true),
      catchError(() => {
        this.auth.logout();
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
