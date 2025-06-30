import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CarService } from '../service/car.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationValidator {
  constructor(private carService: CarService) {}

  /*
  checkAvailability(carId: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const startDate = control.get('startDate')?.value;
      const endDate = control.get('endDate')?.value;

      if (!startDate || !endDate) {
        return of(null); // Pas d'erreur si les dates ne sont pas encore définies
      }

      return this.carService.checkAvailability(carId, startDate, endDate).pipe(
        map((isAvailable: boolean) => {
          return isAvailable ? null : { carUnavailable: true };
        }),
        catchError(() => of({ carUnavailable: true })) // En cas d'erreur, considérer comme non disponible
      );
    };
  }*/
}
