import { Component , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-change-password-dialog',
  standalone: false,
  templateUrl: './change-password-dialog.html',
  styleUrl: './change-password-dialog.css'
})
export class ChangePasswordDialog {

// FORM GROUP FOR PASSWORD FIELDS

passwordForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    public dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) public userId: number
  ) {

// Initialize form controls with validators

     this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

// HANDLES PASSWORD CHANGE SUBMISSION

  changePassword() {
   if (this.passwordForm.invalid) return;

  const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

// Check if new passwords match

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match");
    return;
  }

// Prepare payload to send to backend

  const payload = {
    userID: this.userId,
    currentPassword,
    newPassword
  };

  // Send change password request

  this.auth.changePassword(payload).subscribe({
    next: (res) => {
      alert(res.message || 'Password changed successfully');
      this.dialogRef.close(true);
    },
    error: () => alert('Failed to change password')
  });
  }

// CLOSES THE DIALOG WITHOUT CHANGING PASSWORD

  cancel() {
    this.dialogRef.close();
  }
}
