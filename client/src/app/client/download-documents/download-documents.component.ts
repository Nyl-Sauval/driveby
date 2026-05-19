import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {LocationService} from '../../service/locationService';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-download-documents',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatIcon,
    MatButton,
    NgIf
  ],
  templateUrl: './download-documents.component.html',
  styleUrl: './download-documents.component.css'
})
export class DownloadDocumentsComponent {

  constructor(private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: { message: string; locationId: string; avenant: any },) {
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
