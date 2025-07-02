import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {LocationService} from '../../service/locationService';

@Component({
  selector: 'app-download-documents',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    NgIf
  ],
  template: `
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button class="buttons" (click)="downloadFacture(data.locationId)">
        <mat-icon>download</mat-icon>
        Facture
      </button>
      <button class="buttons" (click)="downloadAvenant(data.locationId)" *ngIf="data.avenant">
        <mat-icon>download</mat-icon>
        Avenant
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './download-documents.component.css'
})
export class DownloadDocumentsComponent {

  constructor(private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: { message: string; locationId: string; avenant: []},) {
  }

  downloadFacture(locationId:any) {
    this.locationService.downloadInvoice(locationId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture-location-${locationId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  downloadAvenant(locationId:any) {
    this.locationService.downloadAvenant(locationId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `avenant-location-${locationId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
