import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profil',
  imports: [
    MatIcon,
    MatButton,
    RouterLink,
    NgIf
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent  implements OnInit {
  id = 0;
  name = '';
  fistname = '';
  email = '';
  phone = '';
  birth = '';
  address = '';
  postal_code = '';
  city = '';
  country = '';
  license_number = '';
  license_issue_date = '';
  license_expiry_date = '';
  license_country = '';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.me();
  }

  me() {
    this.auth.me().subscribe({
      next: (response: any) => {
        console.log(response);

        const client = response.data;
        console.log(client);
        this.id = client.id;
        this.name = client.client_name;
        this.fistname = client.client_firstname;
        this.email = client.client_email;
        this.phone = client.client_phone;
        this.birth = client.client_birth;
        this.address = client.client_address;
        this.postal_code = client.client_postal_code;
        this.city = client.client_city;
        this.country = client.client_country;
        this.license_number = client.client_license_number;
        this.license_issue_date = client.client_license_issue_date;
        this.license_expiry_date = client.client_license_expiry_date;
        this.license_country = client.client_license_country;

      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil', err);
      }

    });
  }
}
