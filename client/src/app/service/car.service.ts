import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CarResponse} from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<CarResponse> {
    return this.http.get<CarResponse>(`${this.baseUrl}/cars`);
  }
}
