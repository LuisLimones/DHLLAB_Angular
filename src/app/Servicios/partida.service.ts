import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { servidorURL } from '../globales/globales';
import { ToastrService } from 'ngx-toastr';
import { Partida } from '../Modelos/partida';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  constructor(private http:HttpClient, private toastr: ToastrService) { }

  url:string = servidorURL;
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  crearPartida(): Observable<Partida>{
    return this.http.get<Partida>(this.url+'crearPartida', this.httpOptions);
  };
  
  getPartidas(): Observable<Partida[]>{
    return this.http.get<Partida[]>(this.url+'partidas', this.httpOptions);
  };

  entrar(data): Observable<Partida>{
    console.log("Entrar partida service "+data);
    return this.http.post<Partida>(this.url+'entrar', data, this.httpOptions);
  }

  salir(data): Observable<Partida>{
    console.log("Llega SALIR ps "+data);
    return this.http.post<Partida>(this.url+'salir', data, this.httpOptions);
  }

  depurar(): Observable<any>{
    return this.http.get<any>(this.url+'depurar', this.httpOptions);
  }
}
