import {Component, Input} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../service/car.service';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-detail-voiture',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatChip,
    MatIcon,
    NgIf,
    NgFor,
    MatCardSubtitle,
    MatCardTitle,
    AsyncPipe
  ],
  templateUrl: './detail-voiture.component.html',
  styleUrl: './detail-voiture.component.css'
})
export class DetailVoitureComponent {
  @Input() car: any;

  constructor(private carService: CarService,
              private route: ActivatedRoute,
              protected auth: AuthService) {
  }

  ngOnInit() {
    // Récupération de l'ID de la voiture depuis les paramètres de la route
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      console.log('ID de la voiture:', carId);
      this.carService.getCarById(carId).subscribe({
        next: (car) => {
          console.log('Détails de la voiture:', car);
          this.car = car;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails de la voiture:', err);
        }
      });
    } else {
      console.error('Aucun ID de voiture trouvé dans les paramètres de la route.');
    }
    this.auth.checkIfAdmin();
  }
}
