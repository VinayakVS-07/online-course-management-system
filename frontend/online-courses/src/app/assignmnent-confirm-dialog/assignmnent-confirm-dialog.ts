import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assignmnent-confirm-dialog',
  standalone: false,
  templateUrl: './assignmnent-confirm-dialog.html',
  styleUrl: './assignmnent-confirm-dialog.css'
})
export class AssignmnentConfirmDialog {
constructor(
    public dialogRef: MatDialogRef<AssignmnentConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}