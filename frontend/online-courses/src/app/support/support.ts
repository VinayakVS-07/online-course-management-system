import { Component, ViewEncapsulation } from '@angular/core';
import { Auth } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: false,
  templateUrl: './support.html',
  styleUrls: ['./support.css'],
  encapsulation: ViewEncapsulation.None
})
export class Support {
 supportForm: FormGroup;
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ) {

 // Get current user details

    const user = this.auth.getLoggedInUser();

     // Initialize support form with validation

    this.supportForm = this.fb.group({
      userID: [user.userID],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

   // Handles form submission for support request

  onSubmit() {
    this.auth.sendSupportRequest(this.supportForm.value).subscribe({
  next: (res) => {
    this.loading = false;
    this.submitted = true;
    this.successMessage = res.message || 'Support request submitted.';
    this.supportForm.reset();
  },
  error: (err) => {
    this.loading = false;
    this.errorMessage = err.error?.message || 'Submission failed.';
    }
   });
  }
}
