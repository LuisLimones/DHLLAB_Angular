import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req, next){
    let token = null;
    if(localStorage.getItem('token') != null){
      token=localStorage.getItem('token');
    }
    let authReq=req.clone({
      setHeaders: {
        Authorization: 'Bearer '+ token
      }
    })
    return next.handle(authReq)
    .pipe(
      catchError(this.manejarError)
    );
  }
  manejarError(error: HttpErrorResponse){
    if(error.status==401){
      alert("Error De Autenticacio\nFavor De Volver A Iniciar Sesion");
      localStorage.removeItem('token');
      location.assign('/');
    }
    else{
      alert("Error Del Servidor Intente Mas Tarde");
      return throwError(error);
    }
  }
}
