import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import {NgFor} from '@angular/common';
import {DetailVoitureComponent} from '../detail-voiture/detail-voiture.component';
import {FormsModule} from '@angular/forms';
import {FiltersComponent} from '../filters/filters.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-liste-voiture',
  standalone: true,
  imports: [NgFor, DetailVoitureComponent, FormsModule, FiltersComponent, MatIcon],
  templateUrl: './liste-voiture.component.html',
  styleUrl: './liste-voiture.component.css'
})
export class ListeVoitureComponent implements OnInit {
  allCars: any[] = [];
  cars: any[] = [];
  agencies: any[] = [];
  selectedAgencyId: string = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadAgencies();
    this.getCars();
  }

  loadAgencies() {
    this.carService.getAllAgencies().subscribe({
      next: (data) => {
        this.agencies = data;
      },
      error: (err) => {
        console.error('Erreur chargement agences :', err);
      }
    });
  }

  onAgencySelected(agencyId: string) {
    console.log('Agence sélectionnée dans le parent:', agencyId);
    this.selectedAgencyId = agencyId;
    this.filterCars();
  }

  getCars() {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        this.allCars = response.data;
        console.log(this.allCars); // tableau de voitures
        console.log('Exemple voiture:', this.allCars[0]);
        this.filterCars();
      },
      error: (err) => {
        console.error('Erreur HTTP :', err);
      }
    });
  }

  filterCars() {
    if (this.selectedAgencyId) {
      const agencyIdNumber = Number(this.selectedAgencyId);
      this.cars = this.allCars.filter(car => car.agency?.id === agencyIdNumber);
    } else {
      this.cars = this.allCars;
    }
  }
}
