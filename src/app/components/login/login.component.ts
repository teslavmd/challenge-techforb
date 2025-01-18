import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../auth/auth-models/login.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginRequest : Login = {
    email : "",
    password : ""
  }

  loginForm : FormGroup;
  email : FormControl;
  password : FormControl;

  alertError : string;
  hasError : boolean = false;

  authService = inject(AuthService);
  router = inject(Router);



  constructor(private formBuilder : FormBuilder){
    
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.loginForm = formBuilder.group({
      email : this.email,
      password : this.password
    })
  }




  login() : void {
    this.loginRequest.email = this.loginForm.get('email')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authService.loginUser(this.loginRequest).subscribe({
      next : response => {
        this.router.navigate(['/dashboard'])
      },
      error : response => {

        this.alertError = response.error.description || "Error al iniciar sesion";
        this.hasError = true;
        console.error(response);
      }
    })
  }






}
