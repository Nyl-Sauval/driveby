import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CarResponse} from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}


  makeReservation(formData: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    return this.http.post(`${this.baseUrl}/locations`, formData, { headers });
  }

  downloadInvoice(locationId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8000/api/locations/${locationId}/invoice`, {
      responseType: 'blob'
    });
  }

  downloadAvenant(locationId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8000/api/locations/${locationId}/avenant`, {
      responseType: 'blob'
    });
  }

  deleteLocation(locationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/locations/${locationId}`);
  }

  getLocationsByAgency(agencyId: string) {
    const url = `${this.baseUrl}/agency/${agencyId}/locations`;
    return this.http.get(url);
  }

  getRetraitById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrait/${id}`);
  }

  updateRetrait(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/retrait/${id}`, data);
  }

  getRetourById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/retour/${id}`);
  }

  updateRetour(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/retour/${id}`, data);
  }

  getLocationById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/location/${id}`);
  }

  updateLocation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/location/${id}`, data);
  }
}
