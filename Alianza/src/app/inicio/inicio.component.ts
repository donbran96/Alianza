import { Component } from '@angular/core';
import { ProductosMesActualComponent } from '../productos-mes-actual/productos-mes-actual.component';
import { HeroComponent } from '../hero/hero.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeroComponent, ProductosMesActualComponent,RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  
}
