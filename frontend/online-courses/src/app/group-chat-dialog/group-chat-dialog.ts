import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-group-chat-dialog',
  standalone: false,
  templateUrl: './group-chat-dialog.html',
  styleUrl: './group-chat-dialog.css'
})
export class GroupChatDialog implements OnInit {

// STATE VARIABLES

  students: any[] = [];
  instructors: any[] = [];
  selectedUserIds: Set<number> = new Set();
  groupName: string = '';

  constructor(
    private auth: Auth,
    private dialogRef: MatDialogRef<GroupChatDialog>
  ) {}

  ngOnInit(): void {

  // FETCH STUDENTS & INSTRUCTORS

    this.auth.getUsersByRole('Student').subscribe(res => this.students = res);
    this.auth.getUsersByRole('Instructor').subscribe(res => this.instructors = res);
  }

// TOGGLE SELECTION OF USERS FOR GROUP CHAT

  toggleSelection(userId: number) {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
  }

  // CHECK IF USER IS ALREADY SELECTED

  isSelected(userId: number): boolean {
    return this.selectedUserIds.has(userId);
  }

  // CREATE GROUP CHAT WITH SELECTED USERS

  createGroupChat() {
    if (!this.groupName.trim() || this.selectedUserIds.size === 0) {
      alert('Please provide a group name and select at least one user.');
      return;
    }

    const payload = {
      groupName: this.groupName.trim(),
      createdBy: this.auth.getLoggedInUser().userID,
      participantIDs: Array.from(this.selectedUserIds)
    };

    this.auth.createGroupChat(payload).subscribe({
      next: () => this.dialogRef.close('created'),
      error: () => alert('Failed to create group chat')
    });
  }

  // CLOSE DIALOG WITHOUT CREATING GROUP

  close() {
    this.dialogRef.close();
  }
}
