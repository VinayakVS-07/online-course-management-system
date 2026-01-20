import { Component } from '@angular/core';
import { Auth } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class Login {
  email = '';
  password = '';
  error = '';
  showRegisterButton = false;

  constructor(private auth: Auth, private router: Router) {}

// Attempts to log in with the entered credentials

  onLogin() {
    const credentials = { email: this.email, password: this.password };

    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        if (res.success) {
          
          localStorage.setItem('user', JSON.stringify(res));
            const role = res.role?.toLowerCase();

          if (role === 'student') {
            this.router.navigate(['/student-dashboard']);
          } else if (role === 'instructor') {
            this.router.navigate(['/courses']);
          } else if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          }
        } else {
         
          this.error = res.message;

          // show Register button if "User not registered"
          this.showRegisterButton = res.message.includes('not registered');
        }
      },
      error: () => {
        this.error = 'Something went wrong. Please try again.';
      }
    });
  }

 // Navigates to the registration page, carrying over entered email

   goToRegister() {
    this.router.navigate(['/new-user-details'], { state: { email: this.email } });
  }
}