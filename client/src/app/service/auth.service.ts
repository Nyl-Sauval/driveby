import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router:Router) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
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

  logout(): void {
    localStorage.removeItem('token');
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
}
