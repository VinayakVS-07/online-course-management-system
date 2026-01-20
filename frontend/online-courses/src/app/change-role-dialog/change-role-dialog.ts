import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-role-dialog',
  standalone: false,
  template: `
    <h2 mat-dialog-title>Change Role</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Select Role</mat-label>
        <mat-select [(ngModel)]="selectedRoleID">
          <mat-option *ngFor="let role of data.roles" [value]="role.roleID">
            {{ role.roleName }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-button color="primary" (click)="dialogRef.close(selectedRoleID)">Save</button>
    </mat-dialog-actions>
  `
})
export class ChangeRoleDialog {
 selectedRoleID: number;

  constructor(
    public dialogRef: MatDialogRef<ChangeRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any; roles: any[] }
  ) {
    this.selectedRoleID = data.roles.find(r => r.roleName === data.user.roleName)?.roleID;
  }
}