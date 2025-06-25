import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-profil',
  imports: [
    MatIcon
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent  implements OnInit {
  name = '';
  fistname = '';
  email = '';
  phone = '';
  birth = '';

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
        this.name = client.client_name;
        this.fistname = client.client_firstname;
        this.email = client.client_email;
        this.phone = client.client_phone;
        this.birth = client.client_birth;

      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil', err);
      }

    });
  }
}
