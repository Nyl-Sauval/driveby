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
  @Input() categories: any[] = [];
  @Input() selectedAgencyId: string = '';
  @Input() selectedCategoryId: string = '';

  @Output() agencySelected = new EventEmitter<{ agencyId: string, categoryId: string }>();

  onSelectionChange() {
    console.log(this.selectedCategoryId);
    this.agencySelected.emit({
      agencyId: this.selectedAgencyId,
      categoryId: this.selectedCategoryId
    });
  }


  resetFilters() {
    this.selectedAgencyId = '';
    this.agencySelected.emit();
  }

}
