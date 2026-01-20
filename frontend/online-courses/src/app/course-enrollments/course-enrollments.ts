import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-course-enrollments',
  standalone: false,
  templateUrl: './course-enrollments.html',
  styleUrl: './course-enrollments.css'
})
export class CourseEnrollments implements OnInit {
 courseId!: number;
  enrolledStudents: any[] = [];
  courseTitle: string = '';

  constructor(private route: ActivatedRoute, private auth: Auth) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEnrollments();
  }

  // Fetch enrollments per course

  loadEnrollments() {
    this.auth.getEnrollmentsByCourse(this.courseId).subscribe({
      next: (res) => {
        this.enrolledStudents = res;
      },
      error: () => alert('Failed to load enrolled students')
    });
  }
}