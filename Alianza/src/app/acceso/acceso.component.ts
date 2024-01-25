import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [LoginComponent, RegistroComponent],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {
  registrarse:boolean=false;
  conectado:boolean=false;
  constructor(private router:Router, private loginService:UsuarioService){
  }
  ngOnInit(){
    this.loginService.UserLogged.subscribe({
      next:(userLogedIn)=>{
        this.conectado=userLogedIn;
      }
    });
    if(this.conectado){
      this.router.navigate(['/mi-perfil']);
    }
  }
  registro(){
    this.registrarse=true;
  }
  login(){
    this.registrarse=false;
  }
}
