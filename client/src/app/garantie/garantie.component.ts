import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garantie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './garantie.component.html',
  styleUrls: ['./garantie.component.css']
})
export class GarantieComponent {
  selectedIndex: number | null = null;

  garanties = [
    {
      titre: 'Garantie Prenium',
      description: 'Meilleur rapport tranquillité / prix',
      prix: '+19.90 €/jour',
      inclusions: [
        'Assurance au tiers',
        'Assistance dépannage 24/7 (50€)',
        'Garantie dommages',
        'Protection vol',
        'Protection accident'
      ],
      exclusions: [
        'Protection intérieure',
        'Protection bris de glaces'
      ]
    },
    {
      titre: 'Garantie Basic',
      description: 'Le minimum conseillé',
      prix: '+14.90 €/jour',
      inclusions: [
        'Assurance au tiers',
        'Assistance dépannage 24/7 (200€)',
        'Garantie dommages',
        'Protection vol'
      ],
      exclusions: [
        'Protection accident',
        'Protection intérieure',
        'Protection bris de glaces'
      ]
    },
    {
      titre: 'Assurance au tiers',
      description: 'Aucune protection complémentaire',
      franchise: 'illimitée',
      prix: '9.90 €/jour',
      inclusions: [
        'Assurance au tiers',
        'Assistance dépannage 24/7 (200€)'
      ],
      exclusions: [
        'Garantie dommages',
        'Protection vol',
        'Protection accident',
        'Protection intérieure',
        'Protection bris de glaces'
      ]
    }
  ];

  select(index: number) {
    this.selectedIndex = index;
  }

  isSelected(index: number): boolean {
    return this.selectedIndex === index;
  }
}
