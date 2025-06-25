import { Component, Input } from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-detail-voiture',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    MatChip,
    MatChipsModule],
  templateUrl: './detail-voiture.component.html',
  styleUrls: ['./detail-voiture.component.css'],
})
export class DetailVoitureComponent {
  @Input() car: any;
}
