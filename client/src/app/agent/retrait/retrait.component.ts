import {Component, Optional} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

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
    MatCheckbox
  ],
  templateUrl: './retrait.component.html',
  styleUrl: './retrait.component.css'
})
export class RetraitComponent {
  retraitForm;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              @Optional() private signinDialogRef?: MatDialogRef<RetraitComponent>
  ) {
    this.retraitForm = this.fb.group({
      dateRetrait: ['', Validators.required, this.dateBeforeToday],
      mileage: ['', Validators.required],
      fuel: ['', [Validators.required]],
      exteriorStatus: ['', [Validators.required]],
      interiorStatus: ['', [Validators.required]],
      default: ['', []],
      done: [false, Validators.requiredTrue],
    });
  }

  dateBeforeToday(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();

    // Supprimer l'heure pour comparer uniquement les dates
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate < today ? null : { dateInvalid: true };
  }

}
