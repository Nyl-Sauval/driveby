import {Component, OnInit, Optional} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {LocationService} from '../../service/locationService';
import {createFakeRetrait, Retrait} from '../../models/retrait.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-retrait',
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './retrait.component.html',
  styleUrl: './retrait.component.css'
})
export class RetraitComponent implements OnInit {
  retraitForm;
  retrait: Retrait = createFakeRetrait();
  retraitId: string | null = null;

  constructor(private fb: FormBuilder,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              @Optional() private signinDialogRef?: MatDialogRef<RetraitComponent>
  ) {
    this.retraitForm = this.fb.group({
      dateRetrait: ['', [Validators.required]],
      mileage: ['', Validators.required],
      fuel: ['', [Validators.required]],
      exteriorStatus: ['', [Validators.required]],
      interiorStatus: ['', [Validators.required]],
      default: ['', []],
      done: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this.loadRetraitAndPopulateForm();
  }

  onSubmit() {
    if (this.retraitForm.valid) {
      const formData = this.retraitForm.value;
      const payload = {
        withdrawal_date: formData.dateRetrait,
        withdrawal_mileage: Number(formData.mileage),
        withdrawal_fuel_level: Number(formData.fuel),
        withdrawal_exterior_status_car: formData.exteriorStatus,
        withdrawal_interior_status_car: formData.interiorStatus,
        withdrawal_default: formData.default ?? '',
        withdrawal_done: formData.done
      };

      this.locationService.updateRetrait(this.retraitId!, payload).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.data.token);
          this.snackBar.open('Retrait effectué', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
          this.signinDialogRef?.close(true);
        },
        error: (error: any) => {
          console.error('Erreur de création créer', error);
        },
      });
    }
  }

  populateForms(retrait: any): void {
    this.retraitForm.patchValue({
      dateRetrait: retrait.withdrawal_date ? new Date(retrait.withdrawal_date).toISOString().substring(0, 10) : '',
      mileage: retrait.withdrawal_mileage,
      fuel: retrait.withdrawal_fuel_level,
      exteriorStatus: retrait.withdrawal_exterior_status_car?.toLowerCase(),
      interiorStatus: retrait.withdrawal_interior_status_car?.toLowerCase(),
      default: retrait.withdrawal_default,
      done: retrait.withdrawal_done
    });
  }

  private loadRetraitAndPopulateForm(): void {
    this.retraitId = this.route.snapshot.paramMap.get('id');

    if (!this.retraitId) {
      console.error('Aucun id de retrait trouvé dans l\'URL');
      return;
    }

    this.locationService.getRetraitById(this.retraitId).subscribe({
      next: (response) => {
        console.log(response);
        this.retrait = response;
        this.populateForms(this.retrait);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du client', error);
      }
    });
  }

}
