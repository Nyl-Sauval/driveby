import { Component } from '@angular/core';
import {CarService} from '../service/car.service';
import {DatePipe, JsonPipe, NgFor, NgForOf, NgIf} from '@angular/common';
import {MatFormField} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatLabel} from '@angular/material/form-field';
import {
  MatTableModule
} from '@angular/material/table';
import {LocationService} from '../service/locationService';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-gestion-agent',
  imports: [
    NgForOf,
    NgFor,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatTableModule,
    NgIf,
    JsonPipe,
    DatePipe
  ],
  templateUrl: './gestion-agent.component.html',
  styleUrl: './gestion-agent.component.css'
})
export class GestionAgentComponent {

  displayedColumns: string[] = ['client_name',
    'client_firstname',
    'car_brand',
    'car_model',
    'withdrawal_date',
    'return_date',
  ];
  agencies: any[] = [];
  selectedAgency: any;
  locations: any[] = [];

  constructor(private carService: CarService,
              private locationService: LocationService) {
  }

  ngOnInit() {
    //Récupération de la liste des agences
    this.carService.getAllAgencies().subscribe({
      next: (agencies) => {
        console.log('Agencies:', agencies);
        this.agencies = agencies;
      },
      error: (err) => {
        console.error('Error fetching agencies:', err);
      }
    })
  }

  onAgencyChanged(agency: any) {
    this.selectedAgency = agency;
    this.locationService.getLocationsByAgency(agency).subscribe({
      next: (response: any) => {
        console.log('Response for selected agency:', response);
        this.locations = response.locations;  // <-- EXTRAIRE locations ici
        console.log('Locations array:', this.locations);
      },
      error: (err) => {
        console.error('Error fetching locations for selected agency:', err);
      }
    });
  }
}
