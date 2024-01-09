import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  telefono:string='800106622';
  correo:string='info@alianzaseguros.com';
  mapa_visible:boolean[]=[true,false,false];
  mostrarmapa(index: number) {
    this.mapa_visible.fill(false);
    this.mapa_visible[index] = true;
  }
}
