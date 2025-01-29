import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:9091/api/public/authenticate'; // Spring Boot endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{ jwt: string }>(this.loginUrl, { email, password })
      .subscribe({
        next: (response) => {
          // Decode the token to extract username and role
          const decodedToken: any = jwtDecode(response.jwt);
          const username = decodedToken.sub; // Assuming 'sub' contains the username
          const role = decodedToken.role; // Assuming 'role' contains the role

          localStorage.setItem('token', response.jwt);
          localStorage.setItem('username', username);
          localStorage.setItem('role', role);

          // Redirect based on role
          this.redirectBasedOnRole(role);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
  }

  redirectBasedOnRole(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'USER') {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/']); // Default route
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}