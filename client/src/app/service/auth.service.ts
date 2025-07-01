import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  public isAgent$ = this.user$.pipe(
    map(user => user?.role === 'agent')
  );

  constructor(private http: HttpClient, private router: Router) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        this.userSubject.next(response.user);
        return response;
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.isAdminSubject.next(false);
    this.router.navigate(['/']);
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profil`, {
      headers: this.getAuthHeaders()
    });
  }

  restoreSession(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.me().pipe(
      catchError(() => {
        this.logout();
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  checkSession(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Pas de token'));
    }

    return this.http.get(`${this.apiUrl}/profil`, {
      headers: this.getAuthHeaders()
    });
  }

  checkIfAdmin(): void {
    this.me().subscribe({
      next: (response: any) => {
        this.isAdminSubject.next(response?.role === 'admin');
      },
      error: () => {
        this.isAdminSubject.next(false);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAgent(): boolean {
    console.log('Checking if user is agent...');
    const user = this.userSubject.value;
    console.log(user.role === 'agent');
    return user?.role === 'agent';
  }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  get currentUser(): any {
    return this.userSubject.value;
  }

  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateClient(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/client/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }
}
