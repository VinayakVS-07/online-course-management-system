import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Auth } from '../services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-instructor-payments',
  standalone: false,
  templateUrl: './instructor-payments.html',
  styleUrl: './instructor-payments.css'
})
export class InstructorPayments implements OnInit, AfterViewInit  {

// TABLE CONFIG & FILTER STATE

  dataSource!: MatTableDataSource<any>;
  totalCount = 0;
  displayedColumns: string[] = ['paymentID', 'studentName', 'courseName', 'amount', 'paymentDate', 'paymentStatus'];

 filter = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  searchTerm: string = '';
  userRole: string = '';


  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    const user = this.auth.getLoggedInUser();
  this.userRole = user?.role?.toLowerCase() || '';
    this.loadPayments();
  }

  // SET SORTING LOGIC

 ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'studentName': return item.studentName?.toLowerCase() || '';
          case 'courseName': return item.courseName?.toLowerCase() || '';
          case 'paymentStatus': return item.paymentStatus?.toLowerCase() || '';
          case 'paymentDate': return new Date(item.paymentDate);
          case 'amount': return item.amount || 0;
          default: return item[property];
        }
      };
    }
  }

   // FETCH PAYMENTS FOR CURRENT INSTRUCTOR

  loadPayments() {
    this.auth.getInstructorPayments(this.filter).subscribe({
      next: (res) => {
       this.dataSource = new MatTableDataSource(res.payments);
        this.totalCount = res.totalCount;
      
         if (this.sort) {
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'studentName': return item.studentName?.toLowerCase() || '';
              case 'courseName': return item.courseName?.toLowerCase() || '';
              case 'paymentStatus': return item.paymentStatus?.toLowerCase() || '';
              case 'paymentDate': return new Date(item.paymentDate);
              case 'amount': return item.amount || 0;
              default: return item[property];
            }
          };
        }
      },
      error: () => alert('Failed to load payments')
    });
  }

  // APPLY SEARCH FILTER

  applySearch() {
    this.filter.page = 1;
    this.filter.searchTerm = this.searchTerm.trim();
    this.loadPayments();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applySearch();
  }

  // HANDLE PAGINATION CHANGE

  onPageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadPayments();
  }

// NAVIGATE TO EARNINGS PAGE

  goToEarningsPage() {
    this.router.navigate(['/instructor/earnings']);
  }
}