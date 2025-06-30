import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router:Router) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map((response: any) => {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.token);
        // Mettre à jour l'utilisateur dans le BehaviorSubject
        this.userSubject.next(response.user);
        return response;
      })
    )
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  me(): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
    return this.http.get(`${this.apiUrl}/profil`, { headers });
  }

  getClientById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
    return this.http.get(`${this.apiUrl}/client/${id}`, { headers });
  }

  updateClient(id: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
    return this.http.put(`${this.apiUrl}/client/${id}`, data, { headers });
  }

  // Supprimer le token, réinitialiser l’état et rediriger
  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  checkIfAdmin(): void {
    this.me().subscribe({
      next: (response: any) => {
        const role = response?.role;
        console.log("role : " + role);
        this.isAdminSubject.next(role === 'admin');
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du client', err);
        this.isAdminSubject.next(false);
      }
    });
  }

  isAgent(): boolean{
    const user = this.userSubject.value;
    console.log("user : " + user);
    console.log("role : " + user?.role);
    return user && user.role === 'agent';
  }

  checkSession(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Pas de token'));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
    return this.http.get(`${this.apiUrl}/profil`, { headers });
  }

  // Stocker l’utilisateur côté front
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  // Pour accéder à l'utilisateur depuis d'autres composants
  get currentUser(): any {
    return this.userSubject.value;
  }

}
