import { Component, OnInit } from '@angular/core';
import { PartidaService } from '../../Servicios/partida.service';
import { Partida } from '../../Modelos/partida';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  constructor(private ps: PartidaService, private router: Router) { }

  partidas: Partida[];
  

  ngOnInit() {
    this.getPartidas();
  }

  getPartidas(){
    this.ps.getPartidas().subscribe(data => {
      this.partidas=data;
    });
  }

  entrar(id){
    this.ps.entrar({id}).subscribe();
    this.router.navigate(['/partidas/'+id]);
  }

}
