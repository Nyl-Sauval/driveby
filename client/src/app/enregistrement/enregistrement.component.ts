import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatError, MatLabel} from '@angular/material/form-field';
import { AuthService } from '../service/auth.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-enregistrement',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatFormField,
    MatFormField,
    MatFormField,
    MatInput,
    MatButton,
    MatFormField,
    MatLabel,
    MatError
  ],
  templateUrl: './enregistrement.component.html',
  styleUrl: './enregistrement.component.css'
})
export class EnregistrementComponent {
  registerForm;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      dob: ['', [Validators.required, this.dateBeforeToday]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      if (formData.password !== formData.passwordConfirm) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      console.log('Formulaire valide', formData);
      const payload = {
        name: formData.name,
        firstname: formData.firstname,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        password: formData.password
      };

      this.authService.register(payload).subscribe({
        next: (response: any) => {
          console.log('Inscription réussie', response);
          console.log('token', response.token);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
          this.snackBar.open('Inscription effectué, vous pouvez maintenant vous connecter', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
        },
        error: (error: any) => {
          console.error('Erreur d’inscription', error);
        },
      });
    }
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
