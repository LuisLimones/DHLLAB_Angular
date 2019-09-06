import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { LoginComponent } from './Componentes/login/login.component';
import { AdminComponent } from './Componentes/admin/admin.component';
import { PartidaComponent } from './Componentes/partida/partida.component';
import { SalasComponent } from './Componentes/salas/salas.component';

const routes: Routes = [
  {path: 'registrar', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'salas', component: SalasComponent},
  {path: 'partidas/:id', component: PartidaComponent},
  {path: '**', redirectTo: "/login" }
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
