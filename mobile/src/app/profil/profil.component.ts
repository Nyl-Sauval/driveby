import { Component, OnInit } from '@angular/core';
import {IonAvatar, IonLabel} from "@ionic/angular/standalone";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonLabel
  ]
})
export class ProfilComponent  implements OnInit {
  id = 0;
  name = '';
  fistname = '';
  email = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.auth.me().subscribe({
      next: (response: any) => {
        console.log(response);

        const client = response.client;
        console.log(client);
        this.id = client.id;
        this.name = client.name;
        this.fistname = client.firstname;
        this.email = client.email;

      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil', err);
      }

    });
  }

}
