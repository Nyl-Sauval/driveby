import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatIcon,
    NgIf,
    MatButton
  ],
  template: `
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <mat-icon class="header-icon">pending_actions</mat-icon>
        <h2 mat-dialog-title>Gestion de Location</h2>
      </div>

      <mat-dialog-content class="dialog-message">
        {{ data.message }}
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-flat-button color="primary" class="btn-action-modal" (click)="openRetrait()" *ngIf="!data.withdrawal_done">
          <mat-icon>login</mat-icon>
          Enregistrer le Retrait
        </button>
        <button mat-flat-button color="accent" class="btn-action-modal retour" (click)="openRetour()" *ngIf="data.withdrawal_done">
          <mat-icon>logout</mat-icon>
          Enregistrer le Retour
        </button>
        <button mat-button mat-dialog-close class="btn-cancel">
          Annuler
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: `
    .dialog-wrapper {
      padding: 8px;
      font-family: 'Inter', sans-serif;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .header-icon {
      color: var(--primary);
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    h2[mat-dialog-title] {
      margin: 0 !important;
      font-size: 20px;
      font-weight: 800;
      color: var(--dark);
      padding: 0 !important;
    }
    
    .dialog-message {
      font-size: 15px;
      color: var(--gray);
      line-height: 1.5;
      margin-bottom: 24px;
      padding: 0 !important;
    }
    
    .dialog-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
      padding: 0 !important;
    }
    
    .btn-action-modal {
      width: 100%;
      height: 48px !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      border-radius: 12px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2) !important;
    }
    
    .btn-action-modal.retour {
      background-color: #f97316 !important;
      color: white !important;
      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2) !important;
    }
    
    .btn-cancel {
      width: 100%;
      height: 44px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      border-radius: 12px !important;
      color: #64748b !important;
    }
  `
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; retraitId: number; retourId: number , withdrawal_done: boolean;},
    private router: Router,
    private dialogRef: MatDialogRef<ModalComponent>
  ) {}

  openRetrait() {
    this.dialogRef.close(true);
    this.router.navigate(['/retrait', this.data.retraitId, 'edit']);
  }

  openRetour() {
    this.dialogRef.close(true);
    this.router.navigate(['/retour', this.data.retourId, 'edit']);
  }
}
