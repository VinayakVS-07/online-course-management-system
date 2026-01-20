import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-course-review',
  standalone: false,
  templateUrl: './course-review.html',
  styleUrl: './course-review.css'
})
export class CourseReview implements OnInit {
  courseID!: number;
  reviews: any[] = [];

  constructor(private route: ActivatedRoute, private auth: Auth) {}

  ngOnInit(): void {

// Fetch reviews per course

    this.courseID = +this.route.snapshot.paramMap.get('id')!;
    this.auth.getCourseReviews(this.courseID).subscribe({
      next: (res) => this.reviews = res,
      error: () => alert('Failed to load reviews')
    });
  }
}