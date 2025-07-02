import { Component, OnInit } from '@angular/core';
import {IonAvatar, IonItem, IonLabel} from "@ionic/angular/standalone";
import {AuthService} from "../services/auth.service";
import {LocationService} from "../services/location.service";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonLabel,
    NgForOf,
    IonItem,
    RouterLink
  ]
})
export class ProfilComponent  implements OnInit {
  id = 0;
  name = '';
  fistname = '';
  email = '';
  allLocations: any[] = [];
  locationsForUser: any[] = [];

  constructor(private auth: AuthService, private loc: LocationService) { }

  ngOnInit() {
    this.auth.me().subscribe({
      next: (response: any) => {
        const client = response.client;
        this.id = client.id;
        this.name = client.name;
        this.fistname = client.firstname;
        this.email = client.email;

        this.loc.getAllLocations().subscribe({
          next: (data) => {
            this.allLocations = data;
            this.locationsForUser = this.getLocationsForUser(this.id);
            console.log('📦 Locations pour ce client :', this.locationsForUser);
          },
          error: (err) => {
            console.error('Erreur chargement locations :', err);
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil', err);
      }
    });
  }

  getLocationsForUser(id: number) {
    return this.allLocations.filter(loc => loc.client?.id === id);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

}
