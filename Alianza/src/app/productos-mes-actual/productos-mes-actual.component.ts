import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';

@Component({
  selector: 'app-productos-mes-actual',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos-mes-actual.component.html',
  styleUrl: './productos-mes-actual.component.css'
})
export class ProductosMesActualComponent {
  productosService:ProductosService=inject(ProductosService);
  productos:Productos[]=[];

  fechaActual: Date = new Date();
  anio: number = this.fechaActual.getFullYear();
  meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  mes: String = this.meses[this.fechaActual.getMonth()];
 
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
