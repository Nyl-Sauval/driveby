import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import {NgFor} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FiltersComponent} from '../filters/filters.component';
import {MatIcon} from '@angular/material/icon';
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

  onSelectionChange(selection: { agencyId: string; categoryId: string, minSelected: number, maxSelected: number }) {
    this.selectedAgencyId = selection.agencyId;
    this.selectedCategoryId = selection.categoryId;
    this.minPrice = selection.minSelected;
    this.maxPrice = selection.maxSelected;
    console.log('Prix sélectionnée dans le parent:', selection.minSelected, selection.maxSelected);
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
    const minSelected = this.minPrice

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
  }

  getMinPrice() {
    if (!this.allCars.length) return 0;
    return Math.min(...this.allCars.map(car => car.price));
  }

  getMaxPrice() {
    if (!this.allCars.length) return 0;
    return Math.max(...this.allCars.map(car => car.price));
  }
}
