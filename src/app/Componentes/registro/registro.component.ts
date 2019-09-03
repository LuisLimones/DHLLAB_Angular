import { Component, OnInit } from '@angular/core';
import { User } from '../../Modelos/user';
import { UsuarioService } from '../../Servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private us: UsuarioService, private toastr: ToastrService) { }

  user: User = {
    id: 0,
    usuario: "",
    password: "",
    tipo: "Usuario",
    partidas: 0,
    ganadas: 0
  }

  ngOnInit() {
  }

  submitRegistrar(){
    console.log("Llega submir registrar")
    this.us.postRegistrar(this.user).subscribe(data => {
      if(data.id>0){
        this.toastr.success('Usuario Creado', '',{
          timeOut: 2000
        });
        this.user= {
          id: 0,
          usuario: "",
          password: "",
          tipo: "Usuario",
          partidas: 0,
          ganadas: 0
        }
      }
      else{
       this.toastr.error('Ocurrio Un Error', '', {
         timeOut: 2000
       }) 
      }
    })
  }

}
