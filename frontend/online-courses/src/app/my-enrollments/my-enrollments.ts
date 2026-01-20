import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-my-enrollments',
  standalone: false,
  templateUrl: './my-enrollments.html',
  styleUrl: './my-enrollments.css'
})
export class MyEnrollments implements OnInit {

// Columns to display in the enrollment table

  displayedColumns: string[] = ['title', 'instructorName', 'enrollmentDate', 'status', 'progress', 'review'];
 enrollments: any[] = [];

  constructor(private auth: Auth) {}

 // Loads the current user's enrollments

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    if (user) {
      this.auth.getUserEnrollments(user.userID).subscribe({
        next: (res) => {
      console.log('Enrollments:', res);
      this.enrollments = res;
      },
        error: () => alert('Failed to load your enrollments')
      });
    }
  }
}