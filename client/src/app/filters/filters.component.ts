import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [
    MatIcon,
    FormsModule,
    NgForOf
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Input() agencies: any[] = [];
  @Input() selectedAgencyId: string = '';

  @Output() agencySelected = new EventEmitter<string>();

  onAgencyChange() {
    console.log('Apply clicked, selectedAgencyId:', this.selectedAgencyId);
    this.agencySelected.emit(this.selectedAgencyId);
  }

  resetFilters() {
    this.selectedAgencyId = '';
    this.agencySelected.emit('');
  }

}
