import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LocationService} from "../services/location.service";
import {ActivatedRoute} from "@angular/router";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
  imports: [
    CurrencyPipe,
    DatePipe
  ]
})
export class LocationDetailComponent  implements OnInit {
  allLocations: any[] = [];
  location:any;

  constructor(private auth: AuthService,
              private loc: LocationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.auth.me().subscribe({
      next: (response: any) => {
        const client = response.client;

        this.loc.getAllLocations().subscribe({
          next: (data) => {
            this.allLocations = data
            console.log('alllocation : ', this.allLocations);
            this.location = this.getLocationsById(id);
            console.log('📦 Location :', this.location);
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

  getLocationsById(id: string | null) {
    return this.allLocations.find(loc => loc.id == id);
  }

  getDaysBetweenDates(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }
}
