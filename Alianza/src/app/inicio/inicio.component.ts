import { Component } from '@angular/core';
import { ProductosComponent } from '../productos/productos.component';
import { HeroComponent } from '../hero/hero.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeroComponent, ProductosComponent,RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
}
