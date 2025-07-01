import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {Observable, of, take} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AgentGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn$.pipe(
      take(1),
      switchMap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return of(false);
        }
        return this.auth.checkSession().pipe(
          map(user => {
            const role = user?.role;
            console.log('User role:', role);
            if (role === 'agent') {
              this.auth.setUser(user);
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          }),
          catchError(() => {
            this.auth.logout();
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      })
    );
  }
}
