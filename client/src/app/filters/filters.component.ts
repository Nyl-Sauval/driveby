import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatSuffix} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {NgxSliderModule, Options} from '@angular-slider/ngx-slider';

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
    MatDatepickerInput,
    NgxSliderModule
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
  initialMinPrice: number = 0;
  initialMaxPrice: number = 0;

  @Output() selected = new EventEmitter<{
    agencyId: string,
    categoryId: string,
    minSelected: number,
    maxSelected: number
  }>();

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['minPrice'] && changes['minPrice'].currentValue > 0) ||
        (changes['maxPrice'] && changes['maxPrice'].currentValue > 0)) {

      if (!this.initialMinPrice && this.minPrice > 0) {
        this.initialMinPrice = this.minPrice;
        this.minSelected = this.minPrice;
      }

      if (!this.initialMaxPrice && this.maxPrice > 0) {
        this.initialMaxPrice = this.maxPrice;
        this.maxSelected = this.maxPrice;
      }

      this.updateSliderOptions();
    }
  }

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
    this.minSelected = this.initialMinPrice;
    this.maxSelected = this.initialMaxPrice;

    this.selected.emit({
      agencyId: '',
      categoryId: '',
      minSelected: this.initialMinPrice,
      maxSelected: this.initialMaxPrice
    });
  }

  priceSliderOptions: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    step: 0.1,
    translate: (value: number): string => value + ' €'
  };

  updateSliderOptions() {
    this.priceSliderOptions = {
      ...this.priceSliderOptions,
      floor: this.minPrice,
      ceil: this.maxPrice
    };

    if (this.minSelected < this.minPrice) this.minSelected = this.minPrice;
    if (this.maxSelected > this.maxPrice) this.maxSelected = this.maxPrice;
  }

}
