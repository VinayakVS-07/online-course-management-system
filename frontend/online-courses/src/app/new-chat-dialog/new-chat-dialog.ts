import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth } from '../services/auth.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-chat-dialog',
  standalone: false,
  templateUrl: './new-chat-dialog.html',
  styleUrls: ['./new-chat-dialog.css'],
  encapsulation: ViewEncapsulation.None

})
export class NewChatDialog implements OnInit {
  selectedRole: string = '';
   users: any[] = [];
  selectedUserId: number | null = null;

  constructor(
    private auth: Auth,
    private dialogRef: MatDialogRef<NewChatDialog>
  ) {}

  ngOnInit(): void {}

   // Fetches users based on selected role

  onRoleChange() {
     if (!this.selectedRole) return;
    const filter = {};

     this.auth.getUsersByRole(this.selectedRole).subscribe({
      next: (users) => this.users = users,
      error: () => alert('Failed to fetch users for role.')
    });
  }

  // Starts chat by closing the dialog and passing the selected user

  startChat() {
    const selected = this.users.find(u => u.userID === Number(this.selectedUserId));
    if (selected) {
      this.dialogRef.close(selected);
    } else {
      alert('Please select a user to start chat.');
    }
  }

 // Closes the dialog without selecting a user

   closeDialog() {
    this.dialogRef.close();
  }
}