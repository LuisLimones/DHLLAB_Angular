import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { Partida } from '../../Modelos/partida';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private ps:PartidaService,
    private router: Router) { }

  numeros: string[]=[];
  seleccionado: string="";
  id: string;
  chat: string[]=[];
  mensaje: string="";
  jugador: string;

  ngOnInit(){
    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.random();
  }

  random(){
    for (let index = 0; index < 12; index++) {
      let numero: number = Math.floor(Math.random()*(24-1)+1);
      let numString: string = numero.toString();
      let index2:number = 0;
      this.numeros.forEach(element => {
        if(numString==element){
          this.numeros.splice(index2, 1);
          index--;
        }
        else{index2++;}
      });
      this.numeros.push(numString);     
    }
  }

  click(value: string){
    console.log("click "+value);
    var elemento = document.getElementById(value);
    if(elemento.style.opacity != '0.4'){
      elemento.style.opacity = '0.4';
      this.seleccionado=value;
    }

    else{
      this.toastr.error('No Puede Seleccionar Un Personaje Ya Usado', '',{
        timeOut: 2000
      });
    }
  }

  enviarMensaje(){
    this.chat.push(this.mensaje);
    this.mensaje="";
    console.log(this.chat);
  }

  salir(){
    let id=this.id;
    this.ps.salir({id}).subscribe(data => {
      this.router.navigate(['/salas']);
    });
  }
}
