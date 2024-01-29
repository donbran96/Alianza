import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
import { Input } from '@angular/core';

@Component({
  selector: 'app-productos-categorizado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './productos-categorizado.component.html',
  styleUrl: './productos-categorizado.component.css'
})
export class ProductosCategorizadoComponent {
  @Input('categoria') categoria='';
  productosService:ProductosService=inject(ProductosService);
  productos:Productos[]=[];
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Suscríbete a los cambios de la ruta
    this.route.params.subscribe((params) => {
      // Obtén el nuevo valor de la categoría
      this.categoria = params['categoria'];

      // Llama a la función que carga los productos
      this.cargarProductos();
    });
  }
  cargarProductos() {
    this.productosService.getProductosByCategory(this.categoria).subscribe({
      next: (productosData) => {
        this.productos = productosData;
        //console.log(this.productos);
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Productos obtenidos');
      }
    });
  }
}
