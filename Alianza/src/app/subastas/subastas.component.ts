import { Component } from '@angular/core';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-subastas',
  standalone: true,
  imports: [ProductosComponent],
  templateUrl: './subastas.component.html',
  styleUrl: './subastas.component.css'
})
export class SubastasComponent {

}
