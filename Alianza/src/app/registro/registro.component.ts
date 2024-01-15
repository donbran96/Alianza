import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre:string='';
  ci:number | undefined = undefined;
  correo:string='';
  telefono:number | undefined = undefined;
  pdf:any;
  password0:string='';
  registrarse(){
    console.log('Usuario: '+this.nombre);
    console.log('Carnet: '+this.ci);
    console.log('Correo: '+this.correo);
    console.log('Teléfono: '+this.telefono);
    console.log('Teléfono: '+this.password0);
  }
}
