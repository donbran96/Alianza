import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';

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
  usuarioconectado:boolean=false;
  subastas:number[]=[];
  constructor(private loginService:UsuarioService, private Router:Router){}
  ngOnInit():void{
    this.loginService.UserLogged.subscribe({
      next:(userLogedIn)=>{
        this.conectado=userLogedIn;
      }
    });
    this.loginService.UserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
        this.subastas=userData.subastas;
      }
    })
  }
  ngOnDestroy():void{
    //this.loginService.UserLogged.unsubscribe();
    //this.loginService.UserData.unsubscribe();
  }
  activaredicion(modo:boolean){
    this.editar=modo;
  }
  logout(){
    this.loginService.logout();
    this.Router.navigate(['/acceso']);
  }
}
