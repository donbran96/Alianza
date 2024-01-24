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
  productosService:ProductosService=inject(ProductosService);
  productos:Productos[]=[];
 
  ngOnInit(){
    this.productosService.getProductos().subscribe({
      next:(productosData)=>{
        this.productos=productosData;
      },
      error:(errorData)=>{
        console.error(errorData);
      },
      complete:()=>{
        console.info('Productos obtenidos');
      }
    });
  }
 
}
