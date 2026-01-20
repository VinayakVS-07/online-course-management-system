import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Auth } from '../services/auth.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-instructors',
  standalone: false,
  templateUrl: './instructors.html',
  styleUrl: './instructors.css'
})
export class Instructors implements OnInit, AfterViewInit{

// TABLE & FILTER STATE

   displayedColumns: string[] = ['instructorName', 'email', 'phone', 'registeredDate', 'status'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
 searchTerm: string = '';
 
  filter = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };
 


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth) {}

  // LOAD INSTRUCTORS

  ngOnInit(): void {
    this.loadInstructors();
  }

// APPLY SORTING

 ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'instructorName': return item.instructorName?.toLowerCase() || '';
          case 'email': return item.email?.toLowerCase() || '';
          case 'phone': return item.phone || '';
          case 'registeredDate': return new Date(item.registeredDate);
          case 'status': return item.status?.toLowerCase() || '';
          default: return item[property];
        }
      };
    }
  }

  // FETCH INSTRUCTORS FROM BACKEND

  loadInstructors() {
    this.auth.getInstructors(this.filter).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.instructors);
        this.totalCount = res.totalCount;

       if (this.sort) {
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'instructorName': return item.instructorName?.toLowerCase() || '';
              case 'email': return item.email?.toLowerCase() || '';
              case 'phone': return item.phone || '';
              case 'registeredDate': return new Date(item.registeredDate);
              case 'status': return item.status?.toLowerCase() || '';
              default: return item[property];
            }
          };
        }
      },
      error: () => alert('Failed to load instructors')
    });
  }

  // HANDLE PAGINATION EVENTS

  onPageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadInstructors();
  }

// SEARCH INSTRUCTORS

applySearch() {
  this.filter.page = 1;
  this.filter.searchTerm = this.searchTerm.trim();
  this.loadInstructors();
}


clearSearch() {
  this.searchTerm = '';
  this.applySearch();
}

}

