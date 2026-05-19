import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../../service/car.service';
import {GuaranteeService} from '../../service/guarantee.service';
import {NgIf, CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {LocationService} from '../../service/locationService';

@Component({
  selector: 'app-details-location',
  imports: [
    NgIf,
    CurrencyPipe,
    MatIcon,
    MatButton
  ],
  templateUrl: './details-location.component.html',
  styleUrl: './details-location.component.css'
})
export class DetailsLocationComponent implements OnInit {
  allLocations: any[] = [];
  location: any = null;

  constructor(private route: ActivatedRoute,
              private carService: CarService,
              private garantieService: GuaranteeService,
              private locationService: LocationService) {}

  ngOnInit() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    console.log('Location ID:', id);
    this.loadLocations(id);
  }

  loadLocations(id: string | null) {
    this.carService.getAllLocations().subscribe({
      next: (data) => {
        this.allLocations = data;
        this.location = this.getLocationById(id);
        console.log(this.location);
      },
      error: (err) => {
        console.error('Erreur chargement locations :', err);
      }
    });
  }

  getLocationById(id: any) {
    return this.allLocations.find(loc => String(loc.id) === String(id));
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getTotalPrice(location: any): number {
    const start = location?.retrait?.withdrawal_date
      ? new Date(location.retrait.withdrawal_date)
      : null;
    const end = location?.retour?.return_date
      ? new Date(location.retour.return_date)
      : null;

    if (!start || !end) return 0;

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const total = diffDays * (location.car?.car_price || 0) / 100;

    return total;
  }

  downloadInvoice(): void {
    if (!this.location) return;
    this.locationService.downloadInvoice(this.location.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facture-location-${this.location.id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement de la facture :', err);
      }
    });
  }
}
