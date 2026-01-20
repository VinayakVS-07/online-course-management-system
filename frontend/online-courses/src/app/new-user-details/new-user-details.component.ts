import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-details',
  standalone: false,
  templateUrl: './new-user-details.component.html',
  styleUrl: './new-user-details.component.css'
})
export class NewUserDetails {

 // User input fields

  firstName = '';
  lastName = '';
  email = history.state.email || '';
  otp = '';
  otpSent = false;
  loading = false;
  resendCooldown = 60;
  resendTimer: any = null;
  canResend = false;

  phone = '';
  password = '';
  role = '';
  createdBy = 'System';
  roles = [
    { id: 3, name: 'Student' },
    { id: 4, name: 'Instructor' }
  ];

  constructor(private auth: Auth, private router: Router) {}

   // Submits the registration form after OTP verification

   onSubmit(form: NgForm) {
    if (form.invalid) return;

    const user = {
      FirstName: this.firstName.trim(),
      LastName: this.lastName.trim(),
      Email: this.email.trim(),
      Phone: this.phone.trim(),
      Password: this.password,
      RoleID: this.role,
      CreatedBy: this.createdBy,
      OTP: this.otp.trim()
    };

    this.loading = true;

    this.auth.verifyOtpAndRegister(user).subscribe({
      next: (res: any) => {
        this.loading = false;
      alert(res.message || 'Successfully Registered!');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      this.loading = false;
      alert(err.error?.message || 'Registration failed or invalid OTP.');
    }
  });
 }

  // Sends OTP to the provided email

 sendOtp() {
  if (!this.email.trim()) {
    alert('Please enter a valid email before sending OTP.');
    return;
  }

  this.auth.sendOtp(this.email.trim()).subscribe({
    next: (res: any) => {
      alert(res.message || 'OTP sent to your email.');
      this.otpSent = true;
      this.startResendCooldown();
    },
    error: (err) => {
      alert(err.error?.message || 'Failed to send OTP.');
    }
  });
}

 // Returns true if OTP is required but not yet filled

isOtpRequired(): boolean {
  return this.otpSent && this.otp.trim().length === 0;
}

// Starts the 60-second cooldown timer for resending OTP

startResendCooldown() {
  this.canResend = false;
  this.resendCooldown = 60;

  if (this.resendTimer) clearInterval(this.resendTimer);

  this.resendTimer = setInterval(() => {
    this.resendCooldown--;

    if (this.resendCooldown <= 0) {
      clearInterval(this.resendTimer);
      this.canResend = true;
    }
  }, 1000);
}


}