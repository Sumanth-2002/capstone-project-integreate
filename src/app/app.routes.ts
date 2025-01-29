import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];