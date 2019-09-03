import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { UsuarioService } from '../../Servicios/usuario.service';
import { User} from '../../Modelos/user';
import { Partida } from '../../Modelos/partida';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ps: PartidaService, private us: UsuarioService) { }

  ngOnInit() {
  }
  crearPartida(){}

  depurarPartidas(){}
}
