import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  

 /* mostrarproductos(){
    this.productos.forEach(producto => {
      console.log(producto);
    });
  }*/ 
  productosService:ProductosService=inject(ProductosService);
  productos:Productos[]=this.productosService.getProductos();
}
