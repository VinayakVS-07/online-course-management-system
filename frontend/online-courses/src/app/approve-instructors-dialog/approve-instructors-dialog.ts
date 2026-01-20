import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-approve-instructors-dialog',
  standalone: false,
  templateUrl: './approve-instructors-dialog.html',
  styleUrl: './approve-instructors-dialog.css'
})
export class ApproveInstructorsDialog {
 pendingInstructors: any[] = [];

  constructor( private auth: Auth, private dialogRef: MatDialogRef<ApproveInstructorsDialog>) {}

  ngOnInit() {
    this.loadPendingInstructors();
  }

  loadPendingInstructors() {
    this.auth.getPendingInstructors().subscribe((res) => {
      this.pendingInstructors = res;
    });
  }

  approveInstructor(userId: number) {
    this.auth.approveInstructor(userId).subscribe(() => {
      this.pendingInstructors = this.pendingInstructors.filter(u => u.userID !== userId);
    });
  }

  close() {
    this.dialogRef.close(true);
  }
}
