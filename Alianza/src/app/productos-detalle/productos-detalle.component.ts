import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopClientesOfertasComponent } from './top-clientes-ofertas/top-clientes-ofertas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, TopClientesOfertasComponent],
  templateUrl: './productos-detalle.component.html',
  styleUrl: './productos-detalle.component.css',
})
export class ProductosDetalleComponent implements OnInit {
  @Input('id_producto') id = '';
  productosService: ProductosService = inject(ProductosService);
  productos: Productos[] = [];
  producto?: Productos;
  
  imagengrande: any;
  activo: boolean[] = [true];
  mostrarimagen: boolean = true;
  puja: number = 0;
  error: string = '';

  ngOnInit() {
    this.update();
    this.productosService.getProductoById(parseInt(this.id, 10)).subscribe({
      next: (productoData) => {
        this.producto = productoData;
        this.imagengrande = this.producto['images'][0];
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Producto obtenido');
      },
    });
  }

  formatearFecha(fecha_fin: Date): string {
    const dia = fecha_fin.getDate();
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const mes = meses[fecha_fin.getMonth()];
    const anio = fecha_fin.getFullYear();
    let fecha_formateada = dia + ' de ' + mes + ' del ' + anio;
    return fecha_formateada;
  }

  cambiarImagen(index: number) {
    this.activo.fill(false);
    this.imagengrande = this.producto?.images[index];
    this.mostrarimagen = false;
    this.mostrarimagen = true;
    this.activo[index] = true;
  }

  enviarpuja() {
    if (!this.puja) {
      this.error = 'Ingrese un valor numérico';
      Swal.fire({
        title: 'Error!',
        text: this.error,
        icon: 'error',
        timer: 3000, // Tiempo en milisegundos (en este caso, 3 segundos)
        timerProgressBar: true, // Muestra una barra de progreso
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    } else if (!!this.producto?.precio_base < !!this.producto?.incremento_puja) {
      this.error = 'La puja debe ser mayor o igual a ' + this.producto?.precio_base + this.producto?.incremento_puja;
      Swal.fire({
        title: 'Error!',
        text: this.error,
        icon: 'error',
        timer: 3000, // Tiempo en milisegundos (en este caso, 3 segundos)
        timerProgressBar: true, // Muestra una barra de progreso
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    } else {
      this.error = 'Puja enviada correctamente';
      Swal.fire({
        title: 'Enviado',
        text: this.error,
        icon: 'success',
        timer: 3000, // Tiempo en milisegundos (en este caso, 3 segundos)
        timerProgressBar: true, // Muestra una barra de progreso
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    }
  }

  update(): void{
    setInterval(() => {
      // Llama a un método para actualizar los datos del componente TopClientesOfertasComponent
      //this.topClientesOfertasComponent.actualizarDatos();
    }, 300000); // 300000 milisegundos = 5 minutos
  }
}
