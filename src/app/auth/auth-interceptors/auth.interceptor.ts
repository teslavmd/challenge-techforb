import { HttpErrorResponse, HttpHeaderResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  const token = localStorage.getItem("token");
  const clonedReq = token ? req.clone({ setHeaders : {Authorization : `Bearer ${token}`}}) : req;
 
  return next(clonedReq).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 403){
        // console.log("aquí")
        const errorMessage = error.error.description || "";
        if(errorMessage.includes('The JWT token has expired')){
          console.warn(errorMessage);
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
