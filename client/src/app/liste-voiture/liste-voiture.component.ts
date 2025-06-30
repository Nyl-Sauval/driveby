import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import {NgFor} from '@angular/common';

import {CardVoitureComponent} from '../card-voiture/card-voiture.component';
import {FormsModule} from '@angular/forms';
import {FiltersComponent} from '../filters/filters.component';
import {CardVoitureComponent} from '../card-voiture/card-voiture.component';

@Component({
  selector: 'app-liste-voiture',
  standalone: true,
  imports: [NgFor, FormsModule, FiltersComponent, CardVoitureComponent],
  templateUrl: './liste-voiture.component.html',
  styleUrl: './liste-voiture.component.css'
})
export class ListeVoitureComponent implements OnInit {
  allCars: any[] = [];
  cars: any[] = [];
  agencies: any[] = [];
  categories: any[] = [];
  locations: any[] = [];
  selectedAgencyId: string = '';
  selectedCategoryId: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  departureDate: Date | null = null;
  returnDate: Date | null = null;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadAgencies();
    this.loadCategories();
    this.getCars();
    this.loadLocations();
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

  loadCategories() {
    this.carService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur chargement categories :', err);
      }
    });
  }

  loadLocations() {
    this.carService.getAllLocations().subscribe({
      next: (data) => {
        this.locations = data;
        console.log(this.locations);
      },
      error: (err) => {
        console.error('Erreur chargement locations :', err);
      }
    });
  }

  onSelectionChange(selection: {
    agencyId: string;
    categoryId: string;
    minSelected: number;
    maxSelected: number;
    departureDate: Date | null;
    returnDate: Date | null;
  }) {
    this.selectedAgencyId = selection.agencyId;
    this.selectedCategoryId = selection.categoryId;
    this.minPrice = selection.minSelected;
    this.maxPrice = selection.maxSelected;
    this.departureDate = selection.departureDate;
    this.returnDate = selection.returnDate;

    console.log('Dates sélectionnées :', this.departureDate, this.returnDate);

    this.filterCars();
  }

  getCars() {
    this.carService.getAllCars().subscribe({
      next: (response) => {
        this.allCars = response.data;
        console.log(this.allCars); // tableau de voitures
        console.log('Exemple voiture:', this.allCars[0]);

        this.minPrice = this.getMinPrice();
        this.maxPrice = this.getMaxPrice();
        this.filterCars();
      },
      error: (err) => {
        console.error('Erreur HTTP :', err);
      }
    });
  }

  filterCars() {
    const agencyIdNumber = Number(this.selectedAgencyId);
    const categoryIdNumber = Number(this.selectedCategoryId);

    this.cars = this.allCars.filter(car => {
      const matchesAgency = this.selectedAgencyId
        ? car.agency?.id === agencyIdNumber
        : true;

      const matchesCategory = this.selectedCategoryId
        ? car.categories?.some((cat: any) => cat.id === categoryIdNumber)
        : true;

      const matchesMinPrice = this.minPrice ? car.price >= this.minPrice : true;
      const matchesMaxPrice = this.maxPrice ? car.price <= this.maxPrice : true;

      return matchesAgency && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    const filtered = this.filterAvailableCarsByDate(this.cars, this.departureDate, this.returnDate);
    this.cars = filtered;
  }

  getMinPrice() {
    if (!this.allCars.length) return 0;
    return Math.min(...this.allCars.map(car => car.price));
  }

  getMaxPrice() {
    if (!this.allCars.length) return 0;
    return Math.max(...this.allCars.map(car => car.price));
  }

  filterAvailableCarsByDate(cars: any[], departureDate: Date | null, returnDate: Date | null): any[] {
    if (!departureDate && !returnDate) {
      return cars;
    }

    const returnDateToUse = returnDate || new Date();

    return cars.filter(car => {
      console.log('filtre ');
      console.log(this.locations);
      const carLocations = this.locations.filter(loc => loc.car_id === car.id);
      console.log(carLocations);

      const isAvailable = !carLocations.some(loc => {
        console.log('loc.retrait:', loc.retrait, 'loc.retour:', loc.retour);
        if (!loc.retrait) return false; // pas de retrait → la location est invalide

        console.log('after if')

        const retraitDate = new Date(loc.retrait.withdrawal_date);
        let retourDate: Date | null = null;
        if (loc.retour) {
          retourDate = new Date(loc.retour.return_date);
        }

        console.log('retrait, retour ',retraitDate, retourDate);

        // Cas 1 : départ + retour sélectionnés
        if (departureDate && returnDate) {
          if (retourDate) {
            return (retraitDate <= returnDate) && (retourDate >= departureDate);
          } else {
            return retraitDate <= returnDate; // en cours de location sans retour
          }
        }

        // Cas 2 : uniquement départ sélectionné
        if (departureDate && !returnDate) {
          if (retourDate) {
            return retourDate >= departureDate;
          } else {
            return true; // toujours en location sans retour = potentiellement occupé
          }
        }

        // Cas 3 : uniquement retour sélectionné
        if (!departureDate && returnDate) {
          return retraitDate <= returnDateToUse;
        }

        return false;
      });

      return isAvailable;
    });
  }

}
