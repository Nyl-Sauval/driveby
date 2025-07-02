import {Component, Optional} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {NgIf} from "@angular/common";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Car} from '../../models/car.model';
import {Client} from '../../models/client.model';
import {CarService} from '../../service/car.service';
import {ActivatedRoute} from '@angular/router';
import {LocationService} from '../../service/locationService';
import {Location, createFakeLocation} from '../../models/location.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-location',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    NgIf,
    ReactiveFormsModule,
    MatFormField
  ],
  templateUrl: './edit-location.component.html',
  styleUrl: './edit-location.component.css'
})
export class EditLocationComponent {
  reservationForm!: FormGroup;
  clientInfoLoaded = false;
  car: Car | undefined;
  client: Client | undefined;
  pricePerDay: string | undefined
  location: Location = createFakeLocation();
  locationId: string | null = null;

  constructor(private fb: FormBuilder,
              private carService: CarService,
              private route: ActivatedRoute,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              @Optional() private signinDialogRef?: MatDialogRef<EditLocationComponent>
  ) {}

  ngOnInit(): void {
    this.loadLocationAndPopulateForm();

    this.reservationForm = this.fb.group({
      reservation: this.fb.group({
        startDate: [new Date(), [Validators.required, this.dateAfterTodayValidator]],
        endDate: ['', Validators.required],
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
      this.locationService.updateLocation(this.locationId!, formData).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.data.token);
          this.snackBar.open('Location effectuée', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
          this.signinDialogRef?.close(true);
        },
        error: (error) => {
          console.error('Erreur lors de la réservation', error);
          //Notification erreur
          alert('Erreur lors de la réservation. Veuillez réessayer plus tard. ' +
            (error?.error?.message || error?.message || 'Erreur inconnue'));
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

  populateForms(location: any): void {
    this.reservationForm.patchValue({
      reservation: {
        startDate: location.retrait.withdrawal_date,
        endDate: location.retour.return_date
      },
      client: {
        name: location.client.client_name,
        firstname: location.client.client_firstname,
        email: location.client.client_email,
        phone: location.client.client_phone,
        birth: location.client.client_birth
      },
      address: {
        address: location.client.client_address,
        postal_code: location.client.client_postal_code,
        city: location.client.client_city,
        country: location.client.client_country
      },
      license: {
        license_number: location.client.client_license_number,
        license_issue_date: location.client.client_license_issue_date,
        license_expiry_date: location.client.client_license_expiry_date,
        license_country: location.client.client_license_country
      }
    });

    this.clientInfoLoaded = true;
  }

  private loadLocationAndPopulateForm(): void {
    this.locationId = this.route.snapshot.paramMap.get('id');

    if (!this.locationId) {
      console.error('Aucun id de location trouvé dans l\'URL');
      return;
    }

    this.locationService.getLocationById(this.locationId).subscribe({
      next: (response) => {
        console.log(response);
        this.location = response;
        this.populateForms(this.location);

        const carId = this.location.car_id;
        if (carId) {
          this.carService.getCarById(carId).subscribe({
            next: (car) => {
              this.car = car;
              this.pricePerDay = car.car_price;
            },
            error: (err) => {
              console.error('Erreur chargement voiture liée :', err);
            }
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du client', error);
      }
    });
  }
}
