import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CarResponse} from '../models/car.model';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarService {
  public baseUrl = 'http://localhost:8000/api';

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

  getCarById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cars/${id}`, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    });
  }

  getAllCategories() {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  getAllLocations() {
    return this.http.get<any[]>(`${this.baseUrl}/locations`);
  }


  checkAvailabilityValidator(carId: string): AsyncValidatorFn {
    console.log('checkAvailabilityValidator called with carId:', carId);
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (!value?.startDate || !value?.endDate) {
        console.log('Invalid value for startDate or endDate:', value);
        return of(null);
      }

      const start = new Date(value.startDate);
      const end = new Date(value.endDate);

      console.log('Checking availability for carId:', carId, 'from', start, 'to', end);

      return this.http.get<any[]>(`${this.baseUrl}/cars/${carId}/locations`).pipe(
        map(locations => {
          const overlapping = locations.some(loc => {
            const retrait = new Date(loc.retrait?.withdrawal_date);
            const retour = new Date(loc.retour?.return_date);
            console.log('Checking location:', loc, 'with retrait:', retrait, 'and retour:', retour);
            return start <= retour && end >= retrait;
          });

          if (overlapping) {
            console.log('❌ Voiture indisponible');
          } else {
            console.log('✅ Voiture disponible');
          }
          return overlapping ? { carUnavailable: true } : null;
        })
      );
    };
  }
}
