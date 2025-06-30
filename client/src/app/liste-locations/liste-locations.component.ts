import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CarService} from '../service/car.service';
import {NgForOf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-liste-locations',
  imports: [
    NgForOf,
    MatIconButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './liste-locations.component.html',
  styleUrl: './liste-locations.component.css'
})
export class ListeLocationsComponent implements OnChanges {
  @Input() userId: number = 0;
  allLocations: any[] = [];
  locationsForUser: any[] = [];
  allAgencies: any[] = [];

  constructor(private carService: CarService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId !== 0) {
      // L'ID a changé, on peut charger les locations
      this.loadLocationsForUser();
      this.loadAgencies();
    }
  }

  loadLocationsForUser() {
    this.carService.getAllLocations().subscribe({
      next: (data) => {
        this.allLocations = data;
        this.locationsForUser = this.getLocationsForUser(this.userId);
        console.log('📦 Locations pour ce client :', this.locationsForUser);
      },
      error: (err) => {
        console.error('Erreur chargement locations :', err);
      }
    });
  }

  loadAgencies() {
    this.carService.getAllAgencies().subscribe({
      next: (data) => {
        this.allAgencies = data;
      },
      error: (err) => {
        console.error('Erreur chargement locations :', err);
      }
    });
  }

  getAgencyById(id: number): any {
    return this.allAgencies.find(agency => agency.id === id);
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
