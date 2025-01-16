import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = localStorage.getItem("token");

  const clonedReq = token ? req.clone({ setHeaders : {Authorization : `Bearer ${token}`}}) : req;
 
  return next(clonedReq);
};
