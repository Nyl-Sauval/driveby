import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatSuffix} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-filters',
  imports: [
    MatIcon,
    FormsModule,
    NgForOf,
    MatFormField,
    MatLabel,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatSuffix,
    MatInput,
    MatFormField,
    MatDatepickerInput
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Input() agencies: any[] = [];
  @Input() categories: any[] = [];
  @Input() selectedAgencyId: string = '';
  @Input() selectedCategoryId: string = '';
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  @Input() minSelected: number = 0;
  @Input() maxSelected: number = 0;
  @Input() departureDate: Date | null = null;
  @Input() returnDate: Date | null = null;

  @Output() selected = new EventEmitter<{
    agencyId: string,
    categoryId: string,
    minSelected: number,
    maxSelected: number
  }>();

  onSelectionChange() {
    console.log(this.selectedCategoryId);
    this.selected.emit({
      agencyId: this.selectedAgencyId,
      categoryId: this.selectedCategoryId,
      minSelected: this.minSelected,
      maxSelected: this.maxSelected
    });
  }


  resetFilters() {
    this.selectedAgencyId = '';
    this.selectedCategoryId = '';
    this.minSelected = this.minPrice;
    this.maxSelected = this.maxPrice;

    this.selected.emit({
      agencyId: '',
      categoryId: '',
      minSelected: 0,
      maxSelected: 0
    });
  }

}
