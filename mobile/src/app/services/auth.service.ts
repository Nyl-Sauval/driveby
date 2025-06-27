import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Auto-injecté dans toute l'application
})
export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
