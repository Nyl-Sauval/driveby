import {Component, OnInit} from '@angular/core';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperModule,
  MatStepperNext,
  MatStepperPrevious
} from '@angular/material/stepper';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {AbstractControl, AsyncValidatorFn, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import {CarService} from '../service/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationService} from '../service/locationService';
import {Car} from '../models/car.model';
import {Client} from '../models/client.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatStepperNext,
    MatStepLabel,
    MatStepperPrevious,
    MatLabel,
    NgIf
  ],
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  clientInfoLoaded = false;
  car: Car | undefined;
  client: Client | undefined;
  pricePerDay: string | undefined

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private carService: CarService,
              private route: ActivatedRoute,
              private locationService: LocationService,
              private router:Router,
              ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      reservation: this.fb.group({
        startDate: [new Date(), [Validators.required, this.dateAfterTodayValidator]],
        endDate: ['', Validators.required],
      }, {
        asyncValidators: this.carService.checkAvailabilityValidator(this.route.snapshot.paramMap.get('id') || ''),
        updateOn:'change'
      }),

      client: this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(20)]],
        birth: ['', [Validators.required]]
      }),
      address: this.fb.group({
        address: ['', Validators.required],
        postal_code: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      }),
      license: this.fb.group({
        license_number: ['', Validators.required],
        license_issue_date: ['', Validators.required],
        license_expiry_date: ['', Validators.required],
        license_country: ['', Validators.required]
      })
    });

    // Préremplissage si connecté
    this.authService.me().subscribe({
      next: (res: any) => {
        this.client = res?.client;
        const clientGroup = this.reservationForm.get('client');
        console.log(res);
        if (res?.client) {
          clientGroup?.patchValue({
            name: res.client.name,
            firstname: res.client.firstname,
            email: res.client.email,
            phone: res.client.phone,
            birth: res.client.birth
          });
          this.reservationForm.get('address')?.patchValue({
            address: res.client.address,
            postal_code: res.client.postal_code,
            city: res.client.city,
            country: res.client.country,
          });
          this.reservationForm.get('license')?.patchValue({
            license_number: res.client.license_number,
            license_issue_date: res.client.license_issue_date,
            license_expiry_date: res.client.license_expiry_date,
            license_country: res.client.license_country
          });
          this.clientInfoLoaded = true;
        }
      }
    });
    //Préremplissage voiture
    const carId = this.route.snapshot.paramMap.get('id');
    if(carId){
      this.carService.getCarById(carId).subscribe({
        next: (car) => {
          if (car) {
            this.car = car;
            this.pricePerDay = car.car_price;
            console.log(this.car);
            this.reservationForm.get('reservation')?.patchValue({
              startDate: new Date(),
              endDate: new Date(new Date().setDate(new Date().getDate() + 1)) // par défaut 1 jour après
            });
          }
        },
        error: (err) => {
          console.error('Erreur chargement voiture sélectionnée :', err);
        }
      });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Réservation envoyée :', this.reservationForm.value);
      // envoyer à l’API
      //requete avec car_id client_id, start_date, end_date
      const formData = {
        car_id: this.car?.id,
        client_id: this.client?.id,
        start_date: this.reservationValues.startDate,
        end_date: this.reservationValues.endDate,
        name: this.clientValues.name,
        firstname: this.clientValues.firstname,
        email: this.clientValues.email,
        phone: this.clientValues.phone,
        birth: this.clientValues.birth,
        address: this.addressValues.address,
        postal_code: this.addressValues.postal_code,
        city: this.addressValues.city,
        country: this.addressValues.country,
        license_number: this.licenseValues.license_number,
        license_issue_date: this.licenseValues.license_issue_date,
        license_expiry_date: this.licenseValues.license_expiry_date,
        license_country: this.licenseValues.license_country
      };
      this.locationService.makeReservation(formData).subscribe({
        next: (response) => {
          console.log('Réservation réussie', response);
          // Notification succès et redirection accueil
          alert('Réservation effectuée avec succès !');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de la réservation', error);
          //Notification erreur
          alert('Erreur lors de la réservation. Veuillez réessayer plus tard.' + error);
        }
      });
    }
  }

  get reservationGroup(): FormGroup {
    return this.reservationForm.get('reservation') as FormGroup;
  }

  get clientGroup(): FormGroup {
    return this.reservationForm.get('client') as FormGroup;
  }

  get addressGroup(): FormGroup {
    return this.reservationForm.get('address') as FormGroup;
  }

  get licenseGroup(): FormGroup {
    return this.reservationForm.get('license') as FormGroup;
  }

  get reservationValues() {
    return this.reservationForm.get('reservation')?.value ?? {};
  }

  get clientValues() {
    return this.reservationForm.get('client')?.value ?? {};
  }

  get addressValues() {
    return this.reservationForm.get('address')?.value ?? {};
  }

  get licenseValues() {
    return this.reservationForm.get('license')?.value ?? {};
  }

  dateAfterTodayValidator(control: AbstractControl): { [key: string]: any } | null {
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate > today ? null : { dateInvalid: true };
  }

  dateAfter(control: AbstractControl, date: string): { [key: string]: any } | null {
    const inputDate = new Date(control.value);
    const compareDate = new Date(date);
    return inputDate > compareDate ? null : { dateInvalid: true };
  }

  carPriceLocation() {
    const startDate = new Date(this.reservationValues.startDate);
    const endDate = new Date(this.reservationValues.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('diffDays : ' + diffDays);
    const pricePerDay = this.car?.price || 0;
    return diffDays * pricePerDay;
  }

  guaranteePriceLocation() {
    return 0;
  }

  optionPriceLocation(){
    return 0;
  }



  totalPriceLocation(){
    return this.carPriceLocation() + this.guaranteePriceLocation() + this.optionPriceLocation();
  }
}
