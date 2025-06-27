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
  categories: any[] = [];
  selectedAgencyId: string = '';
  selectedCategoryId: string = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadAgencies();
    this.loadCategories();
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

  onSelectionChange(selection: { agencyId: string; categoryId: string }) {
    this.selectedAgencyId = selection.agencyId;
    console.log('Categorie sélectionnée dans le parent:', selection.categoryId);
    this.selectedCategoryId = selection.categoryId;
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
    const agencyIdNumber = Number(this.selectedAgencyId);
    const categoryIdNumber = Number(this.selectedCategoryId);

    this.cars = this.allCars.filter(car => {
      const matchesAgency = this.selectedAgencyId
        ? car.agency?.id === agencyIdNumber
        : true;

      const matchesCategory = this.selectedCategoryId
        ? car.categories?.some((cat: any) => cat.id === categoryIdNumber)
        : true;

      return matchesAgency && matchesCategory;
    });
  }
}
