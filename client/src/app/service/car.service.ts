import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CarResponse} from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAllCars(agencyId?: string): Observable<CarResponse> {
    console.log('Appel getAllCars avec agencyId:', agencyId);
    let url = `${this.baseUrl}/cars`;
    console.log(agencyId);
    if (agencyId) {
      url += `?agency_id=${encodeURIComponent(agencyId)}`;
    }
    return this.http.get<CarResponse>(url);
  }


  getAllAgencies() {
    return this.http.get<any[]>(`${this.baseUrl}/agencies`);
  }
}
