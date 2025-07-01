import {Component, Optional} from '@angular/core';
import {
  createFakeRetour, Retour
} from '../../models/retour.model';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LocationService} from '../../service/locationService';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-retour',
  imports: [
    FormsModule,
    MatButton,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatError
  ],
  templateUrl: './retour.component.html',
  styleUrl: './retour.component.css'
})
export class RetourComponent {
  retourForm;
  retour: Retour = createFakeRetour();
  retourId: string | null = null;

  constructor(private fb: FormBuilder,
              private locationService: LocationService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              @Optional() private signinDialogRef?: MatDialogRef<RetourComponent>
  ) {
    this.retourForm = this.fb.group({
      dateRetour: ['', [Validators.required]],
      mileage: ['', Validators.required],
      fuel: ['', [Validators.required]],
      exteriorStatus: ['', [Validators.required]],
      interiorStatus: ['', [Validators.required]],
      default: ['', []],
      done: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this.loadRetourAndPopulateForm();
  }

  onSubmit() {
    console.log('Valeur dateRour au submit:', this.retourForm.get('dateRetour')?.value);
    console.log('Form valid:', this.retourForm.valid);
    if (this.retourForm.valid) {
      const formData = this.retourForm.value;
      console.log('Formulaire valide', formData);
      const payload = {
        return_date: formData.dateRetour,
        return_mileage: Number(formData.mileage),
        return_fuel_level: Number(formData.fuel),
        return_exterior_status_car: formData.exteriorStatus,
        return_interior_status_car: formData.interiorStatus,
        return_default: formData.default ?? '',
        return_done: formData.done
      };
      console.log('Payload envoyé à l’API:', payload);

      this.locationService.updateRetour(this.retourId!, payload).subscribe({
        next: (response: any) => {
          console.log('retour réussie', response);
          localStorage.setItem('token', response.data.token);
          this.snackBar.open('retour effectué', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
          this.signinDialogRef?.close(true);
        },
        error: (error: any) => {
          console.error('Erreur de création créer', error);
          console.log('Détail de l\'erreur backend :', error.error);
        },
      });
    }
  }

  populateForms(retour: any): void {
    this.retourForm.patchValue({
      dateRetour: retour.return_date ? new Date(retour.return_date).toISOString().substring(0, 10) : '',
      mileage: retour.return_mileage,
      fuel: retour.return_fuel_level,
      exteriorStatus: retour.return_exterior_status_car?.toLowerCase(),
      interiorStatus: retour.return_interior_status_car?.toLowerCase(),
      default: retour.return_default,
      done: retour.return_done
    });
  }

  private loadRetourAndPopulateForm(): void {
    this.retourId = this.route.snapshot.paramMap.get('id');

    if (!this.retourId) {
      console.error('Aucun id de retour trouvé dans l\'URL');
      return;
    }

    this.locationService.getRetourById(this.retourId).subscribe({
      next: (response) => {
        console.log(response);
        this.retour = response;
        this.populateForms(this.retour);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du client', error);
      }
    });
  }

}
