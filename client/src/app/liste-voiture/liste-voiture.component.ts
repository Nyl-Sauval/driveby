import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import {NgFor} from '@angular/common';
import {DetailVoitureComponent} from '../detail-voiture/detail-voiture.component';

@Component({
  selector: 'app-liste-voiture',
  standalone: true,
  imports: [NgFor, DetailVoitureComponent],
  templateUrl: './liste-voiture.component.html',
  styleUrl: './liste-voiture.component.css'
})
export class ListeVoitureComponent implements OnInit {
  cars: any[] = [];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        this.cars = response.data;
        console.log(this.cars); // tableau de voitures

        // Exemple : afficher les noms des agences
        this.cars.forEach(car => {
          console.log(car.brand, car.agency?.name);
        });
      },
      error: (err) => {
        console.error('Erreur HTTP :', err);
      }
    });
  }
}
