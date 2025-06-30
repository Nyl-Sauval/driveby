import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  me(): Observable<Object> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
    return this.http.get(`${this.apiUrl}/profil`, { headers });
  }
}
