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
  }

  login(){
    this.us.login(this.datos).subscribe(data => {
      console.log(data);
      if(data.token.token){
        localStorage.setItem('token', data.token.token);
        localStorage.setItem('tipo', data.us.tipo);
        this.toastr.success('Bienvenido','',{
          timeOut: 2000
        })
      }
      else{
        this.toastr.error('Error de autenticacion', '', {
          timeOut:2000
        })
      }
    });
  }
}
