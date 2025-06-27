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

        const client = response.client;
        console.log(client);
        this.id = client.id;
        this.name = client.name;
        this.fistname = client.firstname;
        this.email = client.email;
        this.phone = client.phone;
        this.birth = client.birth;
        this.address = client.address;
        this.postal_code = client.postal_code;
        this.city = client.city;
        this.country = client.country;
        this.license_number = client.license_number;
        this.license_issue_date = client.license_issue_date;
        this.license_expiry_date = client.license_expiry_date;
        this.license_country = client.license_country;

      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil', err);
      }

    });
  }
}
