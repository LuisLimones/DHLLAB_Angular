import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { UsuarioService } from '../../Servicios/usuario.service';
import { User} from '../../Modelos/user';
import { Partida } from '../../Modelos/partida';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private ps: PartidaService, private us: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  crear(){
    this.ps.crearPartida().subscribe(data => {
      this.toastr.success('Partida Creada Numero: '+data.id, '', {
        timeOut:2000
      })
    });
  }

  depurar(){
    this.ps.depurar().subscribe(data => {
      if(data){
        this.toastr.success('Partidas Eliminadas', '', {
          timeOut:2000
        })
      }
    })
  }
}
