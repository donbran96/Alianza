import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  submenu:boolean=false;
  categorias:string[]=['Automotor','Maquinaria','Equipos Electronicos', 'Linea Blanca','Muebles','Materiales en deshuso chatarra', 'Repuestos y partes','Otros'];
  mantenerHover:boolean=false;
  mostrarSubmenu(valor:boolean){
    this.submenu=valor;
    //console.log(this.submenu);
  }
  activarHover(valor:boolean){
    this.mantenerHover=valor;
  }
}
