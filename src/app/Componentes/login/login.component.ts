import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Servicios/usuario.service';
import { Router } from '@angular/router';

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

  constructor(private us: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

}
