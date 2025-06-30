import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CarService} from '../service/car.service';
import {NgForOf, NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {LocationService} from '../service/locationService';

@Component({
  selector: 'app-liste-locations',
  imports: [
    NgForOf,
    MatIconButton,
    MatIcon,
    RouterLink,
    NgIf
  ],
  templateUrl: './liste-locations.component.html',
  styleUrl: './liste-locations.component.css'
})
export class ListeLocationsComponent implements OnChanges {
  @Input() userId: number = 0;
  allLocations: any[] = [];
  locationsForUser: any[] = [];
  allAgencies: any[] = [];

  constructor(private carService: CarService, private locationService: LocationService) {
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
    return this.allLocations
      .filter(loc => loc.client?.id === id)
      .sort((a, b) => {
        const dateA = new Date(a.retrait.withdrawal_date).getTime();
        const dateB = new Date(b.retrait.withdrawal_date).getTime();

        // Tri croissant => les dates les plus proches (récentes) en premier
        return dateB - dateA;
      });
  }

  isLocationPast(location: any): boolean {
    const withdrawalDate = new Date(location.retrait.withdrawal_date);
    const today = new Date();
    withdrawalDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    return withdrawalDate < today;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  download(locationId:any) {
    this.locationService.downloadInvoice(locationId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture-location-${locationId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

}
