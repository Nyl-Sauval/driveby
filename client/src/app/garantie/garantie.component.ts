import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ⬅️ AJOUT ICI
import { GuaranteeService, Guarantee } from '../service/guarantee.service';

@Component({
  selector: 'app-garantie',
  standalone: true,
  imports: [CommonModule], // ⬅️ AJOUT ICI AUSSI
  templateUrl: './garantie.component.html',
  styleUrls: ['./garantie.component.css']
})
export class GarantieComponent implements OnInit {
  selectedIndex: number | null = null;
  garanties: Guarantee[] = [];

  constructor(private guaranteeService: GuaranteeService) {}

  ngOnInit(): void {
    this.guaranteeService.getGuarantees().subscribe((data) => {
      console.log(data); // utile pour debug
      this.garanties = data;
    });
  }

  select(index: number): void {
    this.selectedIndex = index;
  }

  isSelected(index: number): boolean {
    return this.selectedIndex === index;
  }
}
