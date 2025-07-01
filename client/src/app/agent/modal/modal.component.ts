import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatIcon
  ],
  template: `
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button class="buttons" (click)="openRetrait()">
        <mat-icon>edit</mat-icon>
        Retrait
      </button>
      <button class="buttons" (click)="openRetour()">
        <mat-icon>edit</mat-icon>
        Retour
      </button>
    </mat-dialog-actions>
  `,
  styles: `
    .actions {
      display: flex;
      flex-direction: column !important;
      justify-content: center !important;
      gap: 20px;

      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        background-color: white;
        border: none;
        width: 120px;
        font-size: 20px;

        &:hover {
          background-color: #f1f0f0;
        }
      }
    }`
})
export class ModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; retraitId: number; retourId: number },
    private router: Router
  ) {}

  openRetrait() {
    console.log("data", this.data);
    this.router.navigate(['/retrait', this.data.retraitId]);
  }

  openRetour() {
    this.router.navigate(['/retour', this.data.retourId]);
  }
}
