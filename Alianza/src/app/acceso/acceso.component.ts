import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [LoginComponent, RegistroComponent],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {
  registrarse:boolean=false;
  registro(){
    this.registrarse=true;
    console.log(this.registrarse);
  }
  login(){
    this.registrarse=false;
    console.log(this.registrarse);
  }
}
