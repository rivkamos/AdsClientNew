import { HttpInterceptorFn } from '@angular/common/http';
// import { request } from 'http';

export const auth1Interceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); 

  if (token) {
    req = req.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
  }

  return next(req);
};
