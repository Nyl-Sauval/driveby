import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Client, createFakeClient} from '../models/client.model';
import {ActivatedRoute, Router} from '@angular/router';
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
import { ReactiveFormsModule } from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-client-edit',
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatInput,
    MatStepLabel,
    MatButton,
    MatStepperPrevious,
    MatStepperNext
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  identityForm: FormGroup = new FormGroup({});
  addressForm: FormGroup = new FormGroup({});
  licenseForm: FormGroup = new FormGroup({});
  client: Client = createFakeClient();

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar)
  {
  }

  ngOnInit() {
    this.identityForm = this.fb.group({
      client_name: ['', Validators.required],
      client_firstname: ['', Validators.required],
      client_email: ['', [Validators.required, Validators.email]],
      client_phone: ['', [Validators.required, Validators.maxLength(20)]],
      client_birth: ['', [Validators.required]],
    });

    this.addressForm = this.fb.group({
      client_address: [''],
      client_postal_code: [''],
      client_city: [''],
      client_country: ['']
    });

    this.licenseForm = this.fb.group({
      client_license_number: [''],
      client_license_issue_date: [''],
      client_license_expiry_date: [''],
      client_license_country: ['']
    });

    this.formGroup = this.fb.group({
      identityForm: this.identityForm,
      addressForm: this.addressForm,
      licenseForm: this.licenseForm
    });

    this.loadClientAndPopulateForm();
  }

  onSubmit(): void {
    console.log('test');
    const formData = {
      ...this.identityForm.value,
      ...this.addressForm.value,
      ...this.licenseForm.value,
    };

    //Envoie requete api
    this.auth.updateClient(this.client.id, formData).subscribe({
      next: (response) => {
        console.log('Client mis à jour avec succès', response);
        //Rediriger vers profil
        this.router.navigate(['/profil']);
        this.snackBar.open('Modification effectuée avec succès', 'Fermer', {
          duration: 5000,
          panelClass: ['snackbar-success']
        });      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du client', error);
        this.snackBar.open('Erreur lors de la modification ! Veuillez réessayez ou contactez un administrateur.', 'Fermer', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      }
    });

  }

  populateForms(client: any): void {
    this.identityForm.patchValue({
      client_name: client.client_name,
      client_firstname: client.client_firstname,
      client_email: client.client_email,
      client_phone: client.client_phone,
      client_birth: client.client_birth,
    });

    this.addressForm.patchValue({
      client_address: client.client_address,
      client_postal_code: client.client_postal_code,
      client_city: client.client_city,
      client_country: client.client_country,
    });

    this.licenseForm.patchValue({
      client_license_number: client.client_license_number,
      client_license_issue_date: client.client_license_issue_date,
      client_license_expiry_date: client.client_license_expiry_date,
      client_license_country: client.client_license_country,
    });
  }

  private loadClientAndPopulateForm(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.error('Aucun id de client trouvé dans l\'URL');
      return;
    }

    this.auth.getClientById(id).subscribe({
      next: (response) => {
        this.client = response.data;
        this.populateForms(this.client);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du client', error);
      }
    });
  }


}
