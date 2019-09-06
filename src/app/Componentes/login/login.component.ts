import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datos: {}={
    usuario: "",
    password: ""
  }

  constructor(private us: UsuarioService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      if(localStorage.getItem('tipo')=="Usuario"){
        this.router.navigate(['/salas']);
      }
      if(localStorage.getItem("tipo")=="Administrador"){
        this.router.navigate(["/admin"]);
      }
    }
  }

  login(){
    this.us.login(this.datos).subscribe(data => {
      console.log(data);
      if(data.token.token){
        localStorage.setItem('token', data.token.token);
        localStorage.setItem('tipo', data.us.tipo);
        localStorage.setItem('idPartida', "0");
        this.toastr.success('Bienvenido','',{
          timeOut: 2000
        })
        if(localStorage.getItem('tipo')=="Usuario"){
          this.router.navigate(['/salas']);
        }
        else{
          this.router.navigate(['/admin']);
        }
      }
      else{
        this.toastr.error('Error de autenticacion', '', {
          timeOut:2000
        })
      }
    });
  }
}
