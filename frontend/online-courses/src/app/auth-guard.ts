import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard running, isLoggedIn =', this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}