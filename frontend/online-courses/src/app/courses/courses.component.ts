import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Auth } from '../services/auth.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/confirm-dialog/confirm-dialog';
import { MatSort } from '@angular/material/sort';
import { EnrollCourseDialog } from '../shared/enroll-course-dialog/enroll-course-dialog';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class Courses implements OnInit, AfterViewInit{

   // TABLE CONFIG & FILTERING

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
   totalCount = 0;
   totalPages = 0;
    searchTerm: string = '';
    userRole: string = '';

   filter = {
    page: 1,
    pageSize: 5,
    search: ''
  };
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth, private router: Router, private dialog: MatDialog) {}


  
  // Initialize user role and load course data

  ngOnInit() {

      const user = this.auth.getLoggedInUser();
  if (user) {
    this.userRole = user.role?.toLowerCase();
  
   this.displayedColumns = ['title', 'categoryName', 'instructorName', 'status', 'price', 'actions'];
  if (this.userRole === 'instructor') {
     this.displayedColumns.splice(2, 0, 'enrolledCount');
    
    
  } else if (this.userRole === 'student') {
      this.displayedColumns.push('enroll'); 
    }else if (this.userRole === 'admin') {
       this.displayedColumns.splice(2, 0, 'enrolledCount');
     
    }
  }
    this.loadCourses(); 
  }
  
  // Configure sorting and pagination for the table

  ngAfterViewInit() {
  if (this.dataSource) {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'title':
          return item.title?.toLowerCase() || '';
        case 'categoryName':
          return item.categoryName?.toLowerCase() || '';
        case 'instructorName':
          return item.instructorName?.toLowerCase() || '';
        case 'status':
          return item.status?.toLowerCase() || '';
        case 'price':
          return item.price || 0;
        default:
          return item[property];
      }
    };
  }
}

// Fetches course data from the server based on filters

  loadCourses() {
  
    this.auth.coursesByFilter(this.filter).subscribe({
     next: (res: any) => {
     this.dataSource = new MatTableDataSource(res.courses);  
     this.totalCount = res.totalCount;
     this.totalPages = Math.ceil(this.totalCount / this.filter.pageSize);

      if (this.sort && this.paginator) {
          this.dataSource.sort = this.sort;
        }
},
    error: (err) => {
      console.error('Failed to load courses', err);
      alert('Failed to load courses');
    }
     
    });
  }

  // Enrolls the current user in the selected course

  enroll(courseId: number) {
  const user = this.auth.getLoggedInUser();
  if (!user) {
    alert('You must be logged in.');
    return;
  }

  const payload = {
    userID: user.userID,
    courseID: courseId,
    createdBy: user.firstName || 'student'
  };

  this.auth.enrollStudent(payload).subscribe({
    next: () => {
      alert('Enrolled successfully!');
      this.loadCourses();
    },
    error: () => alert('Enrollment failed.')
  });
}

// Navigates to the enrollment list for a specific course

viewEnrollments(courseId: number) {
  this.router.navigate(['/courses', courseId, 'enrollments']);
}

// Opens a dialog to confirm enrollment and handle payment

confirmAndPay(course: any) {
  const dialogRef = this.dialog.open(EnrollCourseDialog, {
   width: 'auto',
      height: 'auto',
      data: course,
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(success => {
    if (success) this.loadCourses();
  });
}

// Executes global search and reloads filtered courses
  
  onSearch() {
    this.filter.page = 1;
    this.filter.search = this.searchTerm;
    this.loadCourses();
  }

 clearSearch() {
    this.searchTerm = '';
    this.onSearch();
  }

// Handles pagination change and reloads data accordingly

  onPageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadCourses();
  }

// Navigates to the create course form

createCourse() {
  this.router.navigate(['/add-course']);
}

 // Navigates to the edit course form for the selected course

editCourse(courseId: number) {
  this.router.navigate(['/edit-course', courseId]);
}

 // Toggles course status between Active and Inactive with confirmation

 toggleCourseStatus(course: any) {
  const newStatus = course.status === 'Active' ? 'Inactive' : 'Active';

  const dialogRef = this.dialog.open(ConfirmDialog, {
    data: { message: `Are you sure you want to ${newStatus.toLowerCase()} this course?` }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.auth.getCourseById(course.courseID).subscribe({
        next: (fullCourse: any) => {
          const updatedCourse = {
            ...fullCourse,
            status: newStatus,
            modifiedBy: 'admin'
          };

          console.log("Before sending to saveCourse:", updatedCourse);

          this.auth.saveCourse(updatedCourse).subscribe({
            next: (res: any) => {
              if (res.success) {
                course.status = newStatus;
              } else {
                alert('Failed to update course status');
              }
            },
            error: (err) => {
              console.error('Error saving status:', err);
              alert('Error updating course status');
            }
          });
        },
        error: () => alert('Failed to fetch full course details')
      });
    }
  });
}

 // Navigates to the payment details for a specific course

viewPayments(courseId: number) {
  this.router.navigate([`/course/${courseId}/payments`]);
}

  // Navigates to the reviews page for a specific course

viewReviews(courseId: number): void {
  this.router.navigate(['/course-reviews', courseId]);
}

// Logs the user out and redirects to login page

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

