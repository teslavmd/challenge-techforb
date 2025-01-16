import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Register } from '../auth/auth-models/register.model';
import { Login } from '../auth/auth-models/login.model';
import { AuthResponse } from '../auth/auth-models/auth-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  http = inject(HttpClient);
  url = environment.apiUrl

  constructor() { }

  registerUser(registerUser : Register) : Observable<any> {
    return this.http.post(`${this.url}/auth/signup`, registerUser, { observe : 'response' });
  }

  loginUser(loginUser : Login) : Observable<any> {
    return this.http.post<AuthResponse>(`${this.url}/auth/login`, loginUser, { observe : 'response' }).pipe(
      tap(data => { 
        if(data.body && data.body.token){
          localStorage.setItem("token", data.body.token);
        }
      })
    )
  }

  getCurrentUser() : Observable<any> {
    return this.http.get<User>(`${this.url}/users/me`)
  }

  logOut() {
    localStorage.removeItem("token");
  }



}
