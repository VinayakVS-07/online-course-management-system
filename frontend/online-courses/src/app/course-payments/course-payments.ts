import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-course-payments',
  standalone: false,
  templateUrl: './course-payments.html',
  styleUrl: './course-payments.css'
})
export class CoursePayments implements OnInit, AfterViewInit {

 // COMPONENT STATE

  courseID: number = 0;
  displayedColumns: string[] = ['paymentID', 'studentName', 'amount', 'paymentDate', 'paymentStatus'];
  dataSource = new MatTableDataSource<any>([]);
  totalEarnings: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.paramMap.get('id');
    this.courseID = courseIdParam ? +courseIdParam : 0;

    if (this.courseID > 0) {
      this.fetchPayments();
    } else {
      alert('Invalid course ID.');
    }
  }

// SETUP PAGINATION & SORTING AFTER VIEW INIT

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // FETCH PAYMENT HISTORY FOR THE GIVEN COURSE

 fetchPayments(): void {
  this.auth.getPaymentsByCourse(this.courseID).subscribe({
    next: (res) => {
      console.log("Payments API Response", res);
      this.dataSource.data = res.payments || [];
      this.totalEarnings = res.summary?.totalEarnings ?? 0;
    },
    error: () => alert('Failed to load payments')
  });
}

}