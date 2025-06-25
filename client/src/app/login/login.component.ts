import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatError, MatLabel} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import {EnregistrementComponent} from '../enregistrement/enregistrement.component';


@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatFormField,
    MatInput,
    MatButton,
    MatFormField,
    MatError,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private loginDialogRef: MatDialogRef<LoginComponent>,
              private signinDialogRef: MatDialogRef<EnregistrementComponent>,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      console.log('Formulaire valide', formData);
      const payload = {
        email: formData.email,
        password: formData.password
      };

      this.authService.login(payload).subscribe({
        next: (response: any) => {
          console.log('Connexion réussie', response);
          console.log('token', response.data.token);
          localStorage.setItem('token', response.data.token);
          this.snackBar.open('Connecté !', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-success']
          });
          this.loginDialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Erreur de connexion', error);
          this.snackBar.open('Erreur de connection ! Veuillez réessayez.', 'Fermer', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        },
      });
    }
  }
}
