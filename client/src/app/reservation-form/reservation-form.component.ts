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
    CurrencyPipe
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

  options = [
    { option_id: 1, option_name: 'GPS intégré', option_description: 'Navigation embarquée', option_price: 4.9, option_type: 'toggle' },
    { option_id: 2, option_name: 'Siège bébé', option_description: 'Enfant 9-18 kg', option_price: 6, option_type: 'stepper' },
    { option_id: 3, option_name: 'Conducteur additionnel', option_description: 'Autre conducteur', option_price: 7.5, option_type: 'stepper' },
    { option_id: 4, option_name: 'Pneu neige / chaînes', option_description: 'Équipement hivernal', option_price: 5, option_type: 'toggle' },
    { option_id: 5, option_name: 'Wi-Fi embarqué', option_description: 'Internet à bord', option_price: 3.5, option_type: 'toggle' }
  ];

  selectedOptions: { [key: number]: number } = {};
  selectedIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private carService: CarService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private garantieService: GuaranteeService
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

    this.options = this.options.map(o => ({
      ...o,
      option_price: o.option_price
    }));

    this.options.forEach(opt => this.selectedOptions[opt.option_id] = 0);
  }

  onSubmit() {
    console.log('Form values:', this.reservationForm.value);
    if (this.reservationForm.valid) {
      console.log('Form is valid, proceeding with reservation...');
      console.log('gantie selected:', this.selectedGuarantee);
      const formData = {
        car_id: this.car?.id,
        client_id: this.client?.id,
        start_date: this.reservationValues.startDate,
        end_date: this.reservationValues.endDate,
        guarantee_id: this.selectedGuarantee.id,
        options: this.selectedOptions,
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

  onToggleChange(option: any) {
    this.selectedOptions[option.option_id] = this.selectedOptions[option.option_id] === 1 ? 0 : 1;
  }

  changeQty(optionId: number, delta: number) {
    const newValue = (this.selectedOptions[optionId] || 0) + delta;
    this.selectedOptions[optionId] = Math.max(0, newValue);
  }

  get reservationDays(): number {
    const start = new Date(this.reservationValues.startDate);
    const end = new Date(this.reservationValues.endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 1);
  }

  getDailyTotal(): number {
    let total = this.car?.price || 0;
    const g = this.getSelectedGuarantee();
    if (g) total += g.guarantee_price;
    this.options.forEach(opt => {
      const qty = this.selectedOptions[opt.option_id] || 0;
      total += opt.option_type === 'toggle' ? (qty === 1 ? opt.option_price : 0) : qty * opt.option_price;
    });
    return total;
  }

  getTotalReservation(): number {
    return this.getDailyTotal() * this.reservationDays;
  }

  carPriceLocation(): number {
    return (this.car?.price || 0) * this.reservationDays;
  }

  guaranteePriceLocation(): number {
    const g = this.getSelectedGuarantee();
    return g ? g.guarantee_price * this.reservationDays : 0;
  }

  optionPriceLocation(): number {
    let total = 0;
    this.options.forEach(opt => {
      const qty = this.selectedOptions[opt.option_id] || 0;
      total += opt.option_type === 'toggle' ? (qty === 1 ? opt.option_price : 0) : qty * opt.option_price;
    });
    return total * this.reservationDays;
  }

  totalPriceLocation(): number {
    return this.carPriceLocation() + this.guaranteePriceLocation() + this.optionPriceLocation();
  }

  getSelectedOptions() {
    return this.options.filter(opt => {
      const val = this.selectedOptions[opt.option_id];
      return opt.option_type === 'toggle' ? val === 1 : val > 0;
    });
  }

  getSelectedGuarantee() {
    const guaranteeId = this.reservationForm.get('guarantee.guarantee_id')?.value;
    return this.garanties.find(g => g.guarantee_id === guaranteeId) || null;
  }

  select(i: number): void {
    this.selectedIndex = i;
    this.reservationForm.get('guarantee.guarantee_id')?.setValue(this.garanties[i].guarantee_id);
    this.selectedGuarantee = this.garanties[i];
  }

  isSelected(i: number): boolean {
    return this.selectedIndex === i;
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
}
