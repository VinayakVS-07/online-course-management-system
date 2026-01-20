import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-menu-layout',
  standalone: false,
  templateUrl: './menu-layout.html',
  styleUrl: './menu-layout.css'
})
export class MenuLayout implements OnInit {
  userName: string = 'User';
   userRole: string = '';
   unreadCount: number = 0;
    isDarkMode = false;

 constructor(private auth: Auth, private router: Router,private renderer: Renderer2) {}

 // Initializes user details, theme, and unread count

ngOnInit() {
  
  const user = this.auth.getLoggedInUser(); 

  if (user) {
      this.userRole = user.role?.toLowerCase() || '';
  if (user && user.firstName && user.lastName) {
    this.userName = `${user.firstName} ${user.lastName}`;
  
  }
  this.loadUnreadCount();
  } else {
    this.userName = 'Profile';
  }

 // Apply saved theme preference

 const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.body, 'dark-theme');
       } else {
    this.isDarkMode = false;
    this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  // Fetches total unread message count for the logged-in user

 loadUnreadCount() {
    const user = this.auth.getLoggedInUser();
    if (!user) return;
    
 this.auth.getTotalUnreadCount(user.userID).subscribe({
        next: (res) => this.unreadCount = res.count,
        error: () => console.warn('Failed to fetch unread count')
  });
 }

// Navigates to the profile page

 goToProfile() {
  this.router.navigate(['/profile']);
}

// Logs the user out and clears localStorage and theme

  logout(): void {
    localStorage.clear();
    this.renderer.removeClass(document.body, 'dark-theme');
  this.isDarkMode = false;
    this.router.navigate(['/login']);
  }

   // Toggles dark mode and updates localStorage

  toggleDarkMode(): void {
  this.isDarkMode = !this.isDarkMode;
  const theme = this.isDarkMode ? 'dark' : 'light';

  if (this.isDarkMode) {
    this.renderer.addClass(document.body, 'dark-theme');
  } else {
    this.renderer.removeClass(document.body, 'dark-theme');
  }

  localStorage.setItem('theme', theme);
}

}