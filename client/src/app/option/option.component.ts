import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionService, Option } from '../service/option.service';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  options: Option[] = [];
  selectedOptions: { [id: number]: number } = {};
  reservationDays: number | null = null; // ← sera défini plus tard via sélection de dates

  constructor(private optionService: OptionService) {}

  ngOnInit(): void {
    this.optionService.getOptions().subscribe({
      next: (data: Option[]) => {
        const stepperKeywords = ['siège bébé', 'réhausseur', 'conducteur'];

        this.options = data.map(opt => ({
          ...opt,
          option_type: stepperKeywords.some(keyword =>
            opt.option_name.toLowerCase().includes(keyword)
          ) ? 'stepper' : 'toggle'
        }));

        this.options.forEach(opt => {
          this.selectedOptions[opt.option_id] = 0;
        });

        // Optionnel : test temporaire
        // this.reservationDays = 5;
      },
      error: (err) => console.error('Erreur API:', err)
    });
  }

  changeQty(id: number, change: number): void {
    const current = this.selectedOptions[id] || 0;
    this.selectedOptions[id] = Math.max(0, current + change);
  }

  onToggleChange(option: Option): void {
    this.selectedOptions[option.option_id] = this.selectedOptions[option.option_id] ? 0 : 1;
  }

  getTotal(): number {
    return this.options.reduce((total, option) => {
      const qty = this.selectedOptions[option.option_id] || 0;
      return total + (qty * option.option_price);
    }, 0);
  }
}
