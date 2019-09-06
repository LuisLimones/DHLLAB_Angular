import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { UsuarioService } from '../../Servicios/usuario.service';
import { User} from '../../Modelos/user';
import { Partida } from '../../Modelos/partida';
import { ToastrService } from 'ngx-toastr';
import Ws from '@adonisjs/websocket-client';
import { wsURL } from '../../globales/Globales';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ps: PartidaService, private us: UsuarioService, private toastr: ToastrService) { }

  ws = Ws(wsURL);
  listener;
  emmiter;
  partidas: Partida[];

  async ngOnInit() {
    await this.wsConectar();
  }

  async ngOnDestroy(){
    await this.wsCerrar()
  }

  crear(){
    this.ps.crearPartida().subscribe(data => {
      this.toastr.success('Partida Creada Numero: '+data.id, '', {
        timeOut:2000
      })
      this.getPartidas();
      this.emmiter.emit('actualizar', this.partidas);
    });
  }

  depurar(){
    this.ps.depurar().subscribe(data => {
      this.getPartidas();
      this.emmiter.emit('actualizar', this.partidas)
      if(data){
        this.toastr.success('Partidas Eliminadas', '', {
          timeOut:2000
        })
      }
    })
  }

  getPartidas(){
    this.ps.getPartidas().subscribe(data => {
      this.partidas=data;
    })
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
