import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { servidorURL } from '../globales/globales';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Modelos/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private toastr: ToastrService) { }
  url:string = servidorURL;
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  postRegistrar(user: User): Observable<User>{
    return this.http.post<User>(this.url+'registrarUsuario', user, this.httpOptions);
  }

  login(data): Observable<any>{
    return this.http.post<any>(this.url+'login', data, this.httpOptions);
  }

  getUsuario():Observable<User>{
    return this.http.get<User>(this.url+'getUsuario', this.httpOptions);
  }
}

