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

  getLocationsByAgency(agencyId: string) {
    const url = `${this.baseUrl}/agency/${agencyId}/locations`;
    return this.http.get(url);
  }
}
