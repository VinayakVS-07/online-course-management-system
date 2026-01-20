import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Auth } from '../services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignmnentConfirmDialog } from '../assignmnent-confirm-dialog/assignmnent-confirm-dialog';

// INTERFACE FOR ASSIGNMENT DATA

interface Assignment {
  assignmentID: number;
  courseID: number;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  fileURL: string;
  isActive: boolean;
}

@Component({
  selector: 'app-assignments',
  standalone: false,
  templateUrl: './assignments.html',
  styleUrl: './assignments.css'
})
export class Assignments implements OnInit, AfterViewInit {

// TABLE & FILTER CONFIG

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Assignment>();
  totalCount = 0;

 filter = {
    courseID: null as number|null,
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };
  searchTerm: string = '';
  userRole = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    const user = this.auth.getLoggedInUser();
    this.userRole = user?.role?.toLowerCase() || '';

  this.displayedColumns = ['title', 'courseTitle', 'dueDate', 'status'];
    
    if (this.userRole !== 'admin') {
      this.displayedColumns.push('actions');
    }

    this.loadAssignments();
  }

  // SET UP SORTING LOGIC

ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'title': return item.title?.toLowerCase() || '';
          case 'courseTitle': return item.courseTitle?.toLowerCase() || '';
          case 'dueDate': return new Date(item.dueDate);
          case 'isActive': return item.isActive ? 'active' : 'inactive';
          default: return (item as any)[property];
        }
      };
    }
  }

  // LOAD ASSIGNMENT DATA FROM BACKEND

loadAssignments() {
  this.auth.getAssignments(this.filter).subscribe({
    next: res => {
       this.dataSource = new MatTableDataSource(res.assignments);
      this.totalCount = res.totalCount;
    
      if (this.sort) {
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'title': return item.title?.toLowerCase() || '';
              case 'courseTitle': return item.courseTitle?.toLowerCase() || '';
              case 'dueDate': return new Date(item.dueDate);
              case 'isActive': return item.isActive ? 'active' : 'inactive';
              default: return (item as any)[property];
            }
          };
        }
      },
    error: err => {
      console.error('Assignments load error', err);
      alert(`Failed to load assignments: ${err.status} ${err.statusText}`);
    }
  });
}

// TOGGLE ASSIGNMENT STATUS (DEACTIVATE/ACTIVATE) WITH CONFIRMATION

toggleStatus(assignment: Assignment) {
  const action = assignment.isActive ? 'deactivate' : 'activate';
  const dialogRef = this.dialog.open(AssignmnentConfirmDialog, {
    width: '350px',
    data: { message: `Are you sure you want to ${action} this assignment?` }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const newStatus = !assignment.isActive;

      this.auth.toggleAssignmentStatus(assignment.assignmentID, newStatus).subscribe({
        next: () => {
          assignment.isActive = newStatus;
        },
        error: err => {
          console.error('Toggle failed', err);
          alert('Failed to update assignment status.');
        }
      });
    }
  });
}

 // SEARCH & FILTER HANDLERS

applySearch() {
  this.filter.page = 1;
  this.filter.searchTerm = this.searchTerm.trim();
  this.loadAssignments();
}

clearSearch() {
  this.searchTerm = '';
  this.applySearch();
}


  onPageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadAssignments();
  }

  // Instructor actions

  addAssignment() {
    this.router.navigate(['/assignments/create']);
  }

  editAssignment(id: number) {
    this.router.navigate(['/assignments/edit', id]);
  }

  viewSubmissions(assignmentId: number) {
    this.router.navigate(['/assignments', assignmentId, 'submissions']);
  }

  // Student actions
  
  submitAssignment(assignment: Assignment) {
    this.router.navigate(['/assignments', assignment.assignmentID, 'submit']);
  }
}
