import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-instructor-earning',
  standalone: false,
  templateUrl: './instructor-earning.html',
  styleUrl: './instructor-earning.css'
})
export class InstructorEarning implements OnInit {
  earnings: any[] = [];
  totalEarnings: number = 0;

  constructor(private auth: Auth) {}

  ngOnInit() {

// Fetch instructor earning per ID

    const user = this.auth.getLoggedInUser();
    if (user?.userID) {
      this.auth.getInstructorEarnings(user.userID).subscribe({
        next: (res) => {
          this.earnings = res;
          this.totalEarnings = res.reduce((sum: number, item: any) => sum + item.totalEarnings, 0);
        },
        error: () => alert('Failed to load earnings')
      });
    }
  }
}