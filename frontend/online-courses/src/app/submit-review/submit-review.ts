import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'app-submit-review',
  standalone: false,
  templateUrl: './submit-review.html',
  styleUrl: './submit-review.css'
})
export class SubmitReview implements OnInit {
  reviewForm!: FormGroup;
  courseID!: number;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseID = +this.route.snapshot.paramMap.get('id')!;
    const user = this.auth.getLoggedInUser();

    this.reviewForm = this.fb.group({
      userID: [user.userID],
      courseID: [this.courseID],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewText: ['', Validators.maxLength(1000)],
      createdBy: [user.firstName || 'student']
    });
  }

stars = [1, 2, 3, 4, 5];

setRating(value: number) {
  this.reviewForm.get('rating')?.setValue(value);
}


  onSubmit(): void {
    if (this.reviewForm.invalid) return;

    // Add reviews for enrolled courses

    this.auth.addOrUpdateCourseReview(this.reviewForm.value).subscribe({
      next: () => {
        alert('Review submitted successfully!');
        this.router.navigate(['/my-enrollments']);
      },
      error: () => alert('Failed to submit review')
    });
  }
}