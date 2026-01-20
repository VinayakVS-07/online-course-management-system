import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialog } from '../change-password-dialog/change-password-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  profile: any;
  userId!: number;
  imagePreview: string = '';

   constructor(private dialog: MatDialog, private auth: Auth, private fb: FormBuilder,private router: Router) {}

 // Initializes component and loads user profile

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
  if (user) {
    this.userId = user.userID;
    this.loadProfile();
    }else {
    alert('Not logged in');
    }
  }

   // Fetches user profile from server and populates form

  loadProfile() {
    this.auth.getUserProfile(this.userId).subscribe({
      next: (data) => {
         console.log('Loaded profile:', data);
        this.profile = data;
        this.imagePreview = data.profilePicture || '';
        this.profileForm = this.fb.group({
          userID: [data.userID],
          firstName: [data.firstName || ''],
          lastName: [data.lastName || ''],
          phone: [data.phone || ''],
           registeredDate: [data.registeredDate || ''],
          profilePicture: [data.profilePicture || '']
        });
      },
      error: () => alert('Failed to load profile')
    });
  }

  // Handles image upload and updates preview + form value

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.profileForm.patchValue({ profilePicture: this.imagePreview });
    };
    reader.readAsDataURL(file);
  }

   // Submits the profile update form to server

  updateProfile() {
    if (this.profileForm.invalid) return;
    this.auth.updateUserProfile(this.profileForm.value).subscribe({
      next: (res) => {
        alert(res.message || 'Profile updated successfully');
         this.router.navigate(['/courses']);
      },
      error: () => alert('Update failed')
    });
  }

// Opens dialog to allow user to change password

  openChangePasswordDialog() {
  const user = this.auth.getLoggedInUser();
  if (user) {
     const dialogRef = this.dialog.open(ChangePasswordDialog, {
      width: '400px',
      data: user.userID
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadProfile(); // Refresh profile if password changed
      }
  });
}
}
}
