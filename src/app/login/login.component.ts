import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.email, this.password);
  }
}