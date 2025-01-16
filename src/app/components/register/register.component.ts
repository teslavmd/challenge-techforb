import { Component, inject } from '@angular/core';
import { RouterLink} from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidationErrors, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Register } from '../../auth/auth-models/register.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerRequest : Register = ({
    email : "",
    password : "",
    fullName : ""
  });

  registerForm : FormGroup;
  username : FormControl;
  email : FormControl;
  password : FormControl;
  confirmPassword : FormControl;

  hasError : boolean = false;
  alertError : string ;
  accountSucceed: boolean = false;


  authService = inject(AuthService);


  constructor(private formBuilder : FormBuilder){

    this.username = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).+$')]);
    this.confirmPassword = new FormControl('', [Validators.required]);

    this.registerForm = this.formBuilder.group({
      username : this.username,
      email : this.email,
      password : this.password,
      confirmPassword : this.confirmPassword
    },
    {
      validators : this.confirmPw,
    }
    )
  }

  confirmPw(formGroup : FormGroup) : ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {diff : true};
  }
  
  isDifferent(){
    return this.registerForm.hasError("diff");
  }

  register() : void {
    this.registerRequest.fullName = this.registerForm.get('username')?.value;
    this.registerRequest.email = this.registerForm.get('email')?.value;
    this.registerRequest.password = this.registerForm.get('password')?.value;
    
    
    this.authService.registerUser(this.registerRequest).subscribe({
      next : response => {

        this.accountSucceed = true;
        this.registerForm.reset();
      },
      error : response => {

        this.alertError = response.error.description || "Error al registrar usuario";
        this.hasError = true;
        console.error(response);
      }
    })


  }

}
