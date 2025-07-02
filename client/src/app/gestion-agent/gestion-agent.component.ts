import {Component} from '@angular/core';
import {CarService} from '../service/car.service';
import {NgFor, NgForOf, NgIf} from '@angular/common';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatLabel} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {LocationService} from '../service/locationService';
import {ModalComponent} from '../agent/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';


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
    MatIcon,
    MatIconButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatSuffix,
    FormsModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './gestion-agent.component.html',
  styleUrl: './gestion-agent.component.css'
})
export class GestionAgentComponent {
  departureDate: Date | null = null;
  clientFilter: string = '';

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
  originalLocations: any[] = []; // Pour stocker les locations originales

  constructor(private carService: CarService,
              private locationService: LocationService,
              private dialog: MatDialog) {
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
        this.originalLocations = response.locations; // Stocker les locations originales pour le filtrage
        console.log('Locations array:', this.locations);
      },
      error: (err) => {
        console.error('Error fetching locations for selected agency:', err);
      }
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  openModal(location: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        message: 'Que souhaitez-vous faire ?',
        retraitId: this.getRetraitId(location),
        retourId: this.getRetourId(location),
        withdrawal_done: location.retrait.withdrawal_done
      }
    });

    return dialogRef.afterClosed();
  }

  getRetraitId(location: any) {
    return location.retrait.withdrawal_id;
  }

  getRetourId(location: any) {
    return location.retour.return_id;
  }

  onDateFilterChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;

    if (!selectedDate || isNaN(selectedDate.getTime())) {
      console.error('Date invalide');
      return;
    }

    console.log('Date sélectionnée :', selectedDate);

    // Exemple : filtrer par date de retrait
    this.locations = this.originalLocations.filter(loc => {
      const retrait = new Date(loc.retrait?.withdrawal_date);
      return retrait.toDateString() === selectedDate.toDateString();
    });
  }

  onClientFilterChange(): void {
    const filterValue = this.clientFilter.toLowerCase();
    this.locations = this.originalLocations.filter(loc => {
      const fullName = `${loc.client.client_firstname} ${loc.client.client_name}`.toLowerCase();
      return fullName.includes(filterValue);
    });
  }

  resetFilters() {
    this.locations = this.originalLocations; // Réinitialiser les locations à l'original
    //reset les filtres
    this.clientFilter = '';
    this.departureDate = null;
  }

  haveWithdrawalAndReturn(location:any): boolean {
    if (location.retrait === null && location.retour === null) {
      return false;
    }
    return true;
  }
}

