import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth/guards/auth-guard';
import { guestGuard } from './auth/guards/guest-guard';

export const routes: Routes = [
    {path : "", redirectTo: "/login", pathMatch: "full"},
    {path : "login", component: LoginComponent, canActivate : [guestGuard]},
    {path : "register", component: RegisterComponent, canActivate : [guestGuard]},
    {
        path : "dashboard", 
        loadComponent: () => import('../app/components/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        canActivate : [authGuard]
    },
    {path : "**", redirectTo: "/login"}
];
