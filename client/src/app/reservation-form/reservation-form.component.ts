import { Component, OnInit } from '@angular/core';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious
} from '@angular/material/stepper';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../service/auth.service';
import { CarService } from '../service/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../service/locationService';
import { Car } from '../models/car.model';
import { Client } from '../models/client.model';
import { CurrencyPipe, NgIf, NgForOf } from '@angular/common';
import {GarantieComponent} from '../garantie/garantie.component';
import {Guarantee, GuaranteeService} from '../service/guarantee.service';
import {Option, OptionService} from '../service/option.service';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
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
    NgIf,
    NgForOf,
    CurrencyPipe,
    MatCheckbox
  ]
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  clientInfoLoaded = false;
  car: Car | undefined;
  client: Client | undefined;
  pricePerDay: string | undefined;
  garanties: Guarantee[] = [];
  selectedGuarantee: any = null;
  options: Option[] = [];
  selectedOptionIds: number[] = [];
  selectedIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private carService: CarService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private garantieService: GuaranteeService,
    private optionService: OptionService
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      reservation: this.fb.group({
        startDate: [new Date(), [Validators.required, this.dateAfterTodayValidator]],
        endDate: ['', Validators.required],
      }, {
        asyncValidators: this.carService.checkAvailabilityValidator(this.route.snapshot.paramMap.get('id') || ''),
        updateOn: 'change'
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
      }),
    });

    this.authService.me().subscribe({
      next: (res: any) => {
        this.client = res?.client;
        if (res?.client) {
          this.reservationForm.get('client')?.patchValue(res.client);
          this.reservationForm.get('address')?.patchValue(res.client);
          this.reservationForm.get('license')?.patchValue(res.client);
          this.clientInfoLoaded = true;
        }
      }
    });

    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getCarById(carId).subscribe({
        next: (car) => {
          if (car) {
            this.car = {
              ...car,
              price: car.price / 100
            };
            this.pricePerDay = this.car?.price?.toFixed(2);
            this.reservationForm.get('reservation')?.patchValue({
              startDate: new Date(),
              endDate: new Date(new Date().setDate(new Date().getDate() + 1))
            });
          }
        },
        error: (err) => console.error('Erreur chargement voiture :', err)
      });
    }

    this.garantieService.getGuarantees().subscribe({
      next: (garanties) => {
        this.garanties = garanties.map(g => ({
          ...g,
          guarantee_price: g.guarantee_price
        }));
      },
      error: (err) => console.error('Erreur chargement garanties :', err)
    });

    this.optionService.getOptions().subscribe({
      next: (options) => {
        this.options = options;
        console.log('Options loaded:', this.options);
        this.selectedOptionIds = [];
      },
      error: (err) => console.error('Erreur chargement options :', err)
    });
  }

  onSubmit() {
    console.log('Form values:', this.reservationForm.value);
    console.log(this.selectedOptionIds);
    if (this.reservationForm.valid) {
      console.log('Form is valid, proceeding with reservation...');
      console.log('gantie selected:', this.selectedGuarantee);
      console.log('selected options:', this.selectedOptionIds);
      const formData = {
        car_id: this.car?.id,
        client_id: this.client?.id,
        start_date: this.reservationValues.startDate,
        end_date: this.reservationValues.endDate,
        guarantee_id: this.selectedGuarantee.id,
        options: this.selectedOptionIds,
        ...this.clientValues,
        ...this.addressValues,
        ...this.licenseValues
      };

      this.locationService.makeReservation(formData).subscribe({
        next: (res: any) => {
          const locationId = res.location.id;
          alert('Réservation effectuée avec succès !');
          this.router.navigate(['/']);
          this.locationService.downloadInvoice(locationId).subscribe(blob => {
            console.log('Blob size:', blob.size);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `facture-location-${locationId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          });
        },
        error: (err) => alert('Erreur lors de la réservation.')
      });
    } else {
      console.log('Form is invalid:', this.reservationForm.errors);
    }
  }

  toggleOption(option: Option): void {
    console.log('Toggling option:', option);
    const index = this.selectedOptionIds.indexOf(option.id);// Check if the option is already selected
    if (index > -1) {
      console.log('Option already selected, removing it:', option.id);
      // If selected, remove it
      this.selectedOptionIds.splice(index, 1);
    } else {
      console.log('Option not selected, adding it:', option.id);
      // If not selected, add it
      this.selectedOptionIds.push(option.id);
    }
  }

  get reservationDays(): number {
    const start = new Date(this.reservationValues.startDate);
    const end = new Date(this.reservationValues.endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24))+1;
  }

  getDailyTotal(): number {
    let total = this.car?.price || 0;
    const g = this.getSelectedGuarantee();
    if (g) total += g.guarantee_price;

    total += this.options
      .filter(opt => this.selectedOptionIds.includes(opt.id))
      .reduce((sum, opt) => sum + opt.option_price, 0);

    return total;
  }


  getSelectedOptions(): Option[] {
    return this.options.filter(opt => this.selectedOptionIds.includes(opt.id));
  }

  getTotalReservation(): number {
    return this.getDailyTotal() * this.reservationDays;
  }

  getSelectedGuarantee() {
    if (this.selectedGuarantee) {
      console.log('Selected guarantee:', this.selectedGuarantee);
      return this.selectedGuarantee;
    }
    return null;
  }

  select(i: number): void {
    this.selectedIndex = i;
    this.reservationForm.get('guarantee.guarantee_id')?.setValue(this.garanties[i].guarantee_id);
    this.selectedGuarantee = this.garanties[i];
  }

  isSelected(i: number): boolean {
    return this.selectedIndex == i;
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

  dateAfterTodayValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate > today ? null : { dateInvalid: true };
  }

  dateAfter(control: AbstractControl, date: string): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const compareDate = new Date(date);
    return inputDate > compareDate ? null : { dateInvalid: true };
  }

  getRoundedPrice(price: number): string {
    return price.toFixed(2);
  }
}
