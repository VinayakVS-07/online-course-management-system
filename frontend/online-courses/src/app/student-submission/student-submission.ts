import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-student-submission',
  standalone: false,
  templateUrl: './student-submission.html',
  styleUrl: './student-submission.css'
})
export class StudentSubmission implements OnInit {
 submissions: any[] = [];
  userId: number = 0;

  constructor(private auth: Auth) {}

  // Fetch the current user and their submissions

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    if (user) {
      this.userId = user.userID;
      this.loadSubmissions();
    } else {
      alert('User not logged in.');
    }
  }

 // Fetches the student's submissions from the server

  loadSubmissions() {
    this.auth.getStudentSubmissions(this.userId).subscribe({
      next: (res) => {
        this.submissions = res;
      },
      error: (err) => {
        console.error('Error loading submissions', err);
        alert('Failed to load submissions.');
      }
    });
  }
}