import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { Partida } from '../../Modelos/partida';
import { Router } from '@angular/router';
import Ws from '@adonisjs/websocket-client';
import { wsURL } from '../../globales/Globales';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  constructor(private ps: PartidaService, private router: Router) { }

  partidas: Partida[];
  ws = Ws(wsURL);
  listener;
  emmiter;
  

  async ngOnInit() {
    this.getPartidas();
    await this.wsConectar();
    this.listener.on('actualizar', (data)=>{
      this.partidas=data;
    });
  }

  async ngOnDestroy(){
    await this.wsCerrar();
  }

  getPartidas(){
    this.ps.getPartidas().subscribe(data => {
      this.partidas=data;
    });
  }

  entrar(id){
    this.ps.entrar({id}).subscribe(data => {
      this.getPartidas();
      this.emmiter.emit('actualizar', this.partidas);
      this.router.navigate(['/partidas/'+id]);
    });
  }

  wsConectar(){
    this.ws.connect();
    this.listener = this.ws.subscribe('salas');
    this.emmiter = this.ws.getSubscription('salas');
  }

  wsCerrar(){
    this.ws.close();
  }

}
