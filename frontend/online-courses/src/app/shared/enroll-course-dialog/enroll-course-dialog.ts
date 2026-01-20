import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Auth } from '../../services/auth.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-enroll-course-dialog',
  standalone: false,
  templateUrl: './enroll-course-dialog.html',
  styleUrl: './enroll-course-dialog.css'
})
export class EnrollCourseDialog implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public course: any,
    private dialogRef: MatDialogRef<EnrollCourseDialog>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private auth: Auth
  ) {}
  

  ngOnInit(): void {
    this.buildForm();
    
  }

  private buildForm() {
    this.form = this.fb.group({
      paymentMethod: ['CARD', Validators.required],
      // Card fields
      cardNumber: [''],
      expiryMonth: [''],
      expiryYear: [''],
      cvv: [''],
      nameOnCard: [''],
      // UPI
      upiId: [''],
      // PayPal
      paypalEmail: ['']
    });
  }

  payNow() {
    if (this.form.invalid) {
      alert('Please fill in required fields.');
      return;
    }

    const confirmRef = this.dialog.open(ConfirmDialog, {
      data: {
        message: `Confirm payment of ₹${this.course.price} for "${this.course.title}"?`
      }
    });

    confirmRef.afterClosed().subscribe(result => {
      if (!result) return;

      const user = this.auth.getLoggedInUser();
      const method = this.form.value.paymentMethod;

      // Build paymentData according to method
      const paymentData: any = {
        userID: user.userID,
        courseID: this.course.courseID,
        amount: this.course.price,
        paymentMethod: method,
        paymentStatus: 'Paid',
        createdBy: user.firstName
      };

      if (method === 'CARD') {
        paymentData.card = {
          number: this.form.value.cardNumber,
          expiryMonth: this.form.value.expiryMonth,
          expiryYear: this.form.value.expiryYear,
          cvv: this.form.value.cvv,
          name: this.form.value.nameOnCard
        };
      } else if (method === 'UPI') {
        paymentData.upi = { vpa: this.form.value.upiId };
      } else if (method === 'PAYPAL') {
        paymentData.paypal = { email: this.form.value.paypalEmail };
      }

      // Start loader
      this.loading = true;

      this.auth.makePayment(paymentData).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.success) {
            alert('Payment successful! You are enrolled. Check your email for details.');
            this.dialogRef.close(true);
          } else {
            alert(res.message || 'Enrollment failed after payment.');
          }
        },
        error: (err) => {
          this.loading = false;
          if (err.error?.includes('already enrolled')) {
            alert('You are already enrolled in this course.');
          } else {
            alert('Error during payment or enrollment.');
          }
        }
      });
    });
  }
}