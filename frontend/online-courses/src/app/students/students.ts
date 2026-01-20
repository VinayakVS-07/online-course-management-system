import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Auth } from '../services/auth.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrls: ['./students.css']
})
export class Students implements OnInit, AfterViewInit {

  // Define the table columns to be displayed

  displayedColumns: string[] = ['studentName', 'email', 'phone', 'registeredDate', 'enrolledCourses'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;

  // Search filter and pagination config

  filter = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };
  searchTerm: string = '';



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  // Set up sorting after view is initialized

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'studentName': return item.studentName?.toLowerCase() || '';
          case 'email': return item.email?.toLowerCase() || '';
          case 'phone': return item.phone || '';
          case 'registeredDate': return new Date(item.registeredDate);
          case 'enrolledCourses': return item.enrolledCourses?.length || 0;
          default: return item[property];
        }
      };
    }
  }

  // Fetch students from backend based on current filter

  loadStudents() {
    this.auth.getStudents(this.filter).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.students);
        this.totalCount = res.totalCount;

        if (this.sort) {
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'studentName': return item.studentName?.toLowerCase() || '';
              case 'email': return item.email?.toLowerCase() || '';
              case 'phone': return item.phone || '';
              case 'registeredDate': return new Date(item.registeredDate);
              case 'enrolledCourses': return item.enrolledCourses?.length || 0;
              default: return item[property];
            }
          };
        }
      },
      error: () => alert('Failed to load students')
    });
  }

  // Handle page change event from paginator

  onPageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadStudents();
  }

  // Apply search filter and reload students

  applySearch(): void {
    this.filter.page = 1;
    this.filter.searchTerm = this.searchTerm.trim();
    this.loadStudents();
  }

  // Clear search input and reload all students

  clearSearch() {
    this.searchTerm = '';
    this.applySearch();
  }


}

