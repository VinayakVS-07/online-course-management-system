import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-student-payments',
  standalone: false,
  templateUrl: './student-payments.html',
  styleUrl: './student-payments.css'
})
export class StudentPayments implements OnInit {
  displayedColumns: string[] = ['paymentID', 'courseName', 'amount', 'paymentDate', 'paymentStatus'];
  dataSource = new MatTableDataSource<any>();

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
    if (user) {

// Fetch each student's transations

      this.auth.getStudentPayments(user.userID).subscribe({
        next: (data) => this.dataSource.data = data,
        error: () => alert('Failed to load payments')
      });
    }
  }
}
