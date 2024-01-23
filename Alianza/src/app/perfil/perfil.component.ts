import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  conectado:boolean=false;
  userData?:Usuario;
  editar:boolean=false;
  subastas:string[]=['Vehículo 1','Electrodoméstico 1'];
  constructor(private loginService:UsuarioService){}
  ngOnInit():void{
    this.loginService.UserLogged.subscribe({
      next:(userLogedIn)=>{
        this.conectado=userLogedIn;
      }
    });
    this.loginService.UserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
      }
    })
  }
  activaredicion(modo:boolean){
    this.editar=modo;
  }
}
