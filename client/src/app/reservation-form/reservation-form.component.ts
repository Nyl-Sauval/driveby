import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../service/auth.service';
import { CarService } from '../service/car.service';
import { LocationService } from '../service/locationService';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/car.model';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  clientInfoLoaded = false;
  car: Car | undefined;
  client: Client | undefined;


    garanties = [
      { guarantee_id: 1, guarantee_name: 'Standard', guarantee_description: 'Couverture de base', guarantee_price: 10 },
      { guarantee_id: 2, guarantee_name: 'Confort', guarantee_description: 'Couverture étendue', guarantee_price: 20 },
      { guarantee_id: 3, guarantee_name: 'Premium', guarantee_description: 'Protection complète', guarantee_price: 30 }
    ];

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      reservation: this.fb.group({
        startDate: [new Date(), [Validators.required, this.dateAfterTodayValidator]],
        endDate: ['', Validators.required]
      }),
      client: this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(20)]],
        birth: ['', Validators.required]
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

    this.authService.me().subscribe({
      next: (res: any) => {
        this.client = res?.client;
        if (res?.client) {
          this.clientGroup.patchValue(res.client);
          this.addressGroup.patchValue(res.client);
          this.licenseGroup.patchValue(res.client);
          this.clientInfoLoaded = true;
        }
      }
    });

    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.carService.getCarById(carId).subscribe({
        next: (car) => {
          this.car = car;
          this.reservationGroup.patchValue({
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1))
          });
        },
        error: (err) => console.error('Erreur chargement voiture :', err)
      });
    }

    this.options.forEach(option => this.selectedOptions[option.option_id] = 0);
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const selectedGuarantee = this.getSelectedGuarantee();const formData = {
        car_id: this.car?.id,
        client_id: this.client?.id,
        start_date: this.reservationValues.startDate,
        end_date: this.reservationValues.endDate,
        guarantee_id: this.getSelectedGuarantee()?.guarantee_id, // ✅ C'est ce que Laravel veut
        options: this.selectedOptions
      };


      this.locationService.makeReservation(formData).subscribe({
        next: () => {
          alert('Réservation effectuée avec succès !');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de la réservation', error);
          alert('Erreur lors de la réservation');
        }
      });
    }
  }

  onToggleChange(option: any) {
    this.selectedOptions[option.option_id] = this.selectedOptions[option.option_id] === 1 ? 0 : 1;
  }

  changeQty(optionId: number, delta: number) {
    const newValue = (this.selectedOptions[optionId] || 0) + delta;
    this.selectedOptions[optionId] = Math.max(0, newValue);
  }

  getTotal(): number {
    return this.getDailyTotal();
  }

  getTotalReservation(): number {
    return this.getDailyTotal() * this.reservationDays;
  }

  getDailyTotal(): number {
    let total = 0;

    if (this.car?.car_price) total += this.car.car_price;

    const g = this.getSelectedGuarantee();
    if (g) total += g.guarantee_price;

    this.options.forEach(opt => {
      const qty = this.selectedOptions[opt.option_id] || 0;
      if (opt.option_type === 'toggle') {
        total += qty === 1 ? opt.option_price : 0;
      } else {
        total += qty * opt.option_price;
      }
    });

    return total;
  }

  get reservationDays(): number {
    const start = new Date(this.reservationValues.startDate);
    const end = new Date(this.reservationValues.endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 1);
  }

  isSelected(i: number): boolean {
    return this.selectedIndex === i;
  }

  select(i: number): void {
    this.selectedIndex = i;
  }

  getSelectedOptions() {
    return this.options.filter(opt => {
      const val = this.selectedOptions[opt.option_id];
      return opt.option_type === 'toggle' ? val === 1 : val > 0;
    });
  }

  getSelectedGuarantee() {
    return this.selectedIndex !== null ? this.garanties[this.selectedIndex] : null;
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
    return this.reservationGroup.value;
  }

  get clientValues() {
    return this.clientGroup.value;
  }

  get addressValues() {
    return this.addressGroup.value;
  }

  get licenseValues() {
    return this.licenseGroup.value;
  }

  dateAfterTodayValidator(control: AbstractControl): { [key: string]: any } | null {
    const today = new Date();
    const inputDate = new Date(control.value);
    return inputDate > today ? null : { dateInvalid: true };
  }
}
