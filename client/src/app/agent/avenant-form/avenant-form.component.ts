import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-avenant-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    ReactiveFormsModule,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    NgIf
  ],
  templateUrl: './avenant-form.component.html',
  styleUrl: './avenant-form.component.css'
})
export class AvenantFormComponent {
  avenantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AvenantFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.avenantForm = this.fb.group({
      date: ['', Validators.required],
      details: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]]
    });
  }

  submit(): void {
    if (this.avenantForm.valid) {
      this.dialogRef.close(this.avenantForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
