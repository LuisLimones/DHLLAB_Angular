import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { Partida } from '../../Modelos/partida';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import Ws from '@adonisjs/websocket-client';
import { wsURL } from '../../globales/Globales';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private ps:PartidaService,
    private router: Router) { }

  numeros: string[]=[]; //Imagenes Del Tablero
  seleccionado: string=""; //Personaje Seleccionado
  personaje: string; //Personaje a encontrar
  id: string; //id de la partida
  chat: string[]=[]; 
  mensaje: string="";
  jugador: string; //Nombre del jugador
  partida: Partida; //Partida actual
  turno: number; //Comprobar el turno de quien es
  rol: string; //Rol basado en el turno para ngIf
  banderaPersonaje=false; //Verifica que este un wey seleccionado
  ws = Ws(wsURL);
  listener;
  emmiter;

  async ngOnInit(){
    this.id=this.route.snapshot.paramMap.get('id');
    let idString=this.id.toString();
    if(localStorage.getItem('idPartida')!=idString){
      localStorage.setItem('idPartida', idString);
      localStorage.setItem('turno', "0");
    }
    this.getPartida();
    await this.wsConectar();
    this.listener.on("mensajes", (data) =>{
      this.chat=data;
    });
    this.listener.on("tablero", (data)=>{
      this.numeros=data;
    });
    this.listener.on("personaje", (data)=>{
      this.personaje=data;
      this.toastr.success("Seleccionaron Un Personaje, Puedes Preguntar", "", {
        timeOut:2000
      })
    });
    this.listener.on("ganador", (data)=>{
      if(data=="ganador"){
        this.toastr.success("Ganador", "Yay",{
          timeOut:3000
        });
        this.turno++;
        localStorage.setItem('turno', this.turno.toString())
        location.reload();
      }
      else{
        this.toastr.error("Perdiste", "Whoops", {
          timeOut:3000
        });
        this.turno++;
        localStorage.setItem('turno', this.turno.toString())
        location.reload();
      }
    });
    this.listener.on("salir", () =>{
      this.toastr.show("Gracias Por El Juego", "", {
        timeOut:2000
      })
      this.salir();
    })
  }

  async ngOnDestroy(){
    this.salir();
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
      this.banderaPersonaje==true;
    }
    else{
      this.toastr.error('No Puede Seleccionar Un Personaje Ya Usado', '',{
        timeOut: 2000
      });
    }
  }

  async enviarMensaje(){
    this.chat.push(this.mensaje);
    await this.emmiter.emit("mensajes", this.chat);
    this.mensaje="";
  }

  salir(){
    let id=this.id;
    localStorage.removeItem('idPartida');
    this.ps.salir({id}).subscribe(data => {
      this.emmiter.emit("salir");
      this.wsClose();
      this.router.navigate(['/salas']);
    });
  }

  wsConectar(){
    this.ws.connect();
    this.listener = this.ws.subscribe('partida:'+this.id.toString());
    this.emmiter = this.ws.getSubscription('partida:'+this.id.toString());
  }

  getPartida(){
    this.ps.obtenerPartida({idPartida: this.id}).subscribe(data => {
      this.partida=data;
      if(Number(localStorage.getItem('turno'))==0){
        this.turno=this.partida.jugadores;
        localStorage.setItem('turno', this.turno.toString());
      }
      else{
        this.turno=Number(localStorage.getItem('turno'));
      }
      this.comprobar();
    })
  }

  comprobar(){
    if(this.turno%2==1){
      this.rol="interrogado";
    }
    else{
      this.rol="interrogador";
      this.random();
      this.emmiter.emit("tablero", this.numeros);
    }
    console.log(this.rol);
  }

  //Escoger El Personaje A Encontrar
  async escogerPersonaje(){
    if(this.seleccionado==''){
      this.toastr.error("Seleccione Un Personaje Primero", "", {
        timeOut: 2000
      })
    }
    else{
      this.personaje=this.seleccionado;
      console.log(this.personaje);
      await this.emmiter.emit("personaje", this.personaje);
      this.toastr.success("Personaje Seleccionado, Responde Las Preguntas");
    }
  }

  //Decir El Personaje A Encontrar
  async juego(){
    if(this.seleccionado==''){
      this.toastr.error("Seleccione Un Personaje Primero", "", {
        timeOut: 2000
      })
    }
    else{
      if(this.seleccionado==this.personaje){
        this.toastr.success("Ganador", "Yay",{
          timeOut:3000
        });
        this.turno++;
        localStorage.setItem('turno', this.turno.toString())
        this.emmiter.emit("ganador", "perdedor");
        location.reload();
      }
      else{
        this.toastr.error("Perdiste", "Whoops", {
          timeOut:3000
        });
        this.turno++;
        localStorage.setItem('turno', this.turno.toString())
        this.emmiter.emit("ganador", "ganador");
        location.reload();
      }
    }
  }

  async wsClose(){
    this.ws.close();
  }
}
