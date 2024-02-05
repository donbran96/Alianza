import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-detalle.component.html',
  styleUrl: './productos-detalle.component.css',
})
export class ProductosDetalleComponent implements OnInit {
  @Input('titulo') titulo = '';
  productosService: ProductosService = inject(ProductosService);
  productos: Productos[] = [];
  producto?: Productos;
  name: String = '';
  nombre: number = 0;
  puja_actual: number = 0;
  categorias: string = '';
  fecha_fin: Date = new Date();
  fecha: string = '';
  aumento: number = 0;
  imagenes: string[] = [];
  productoEncontrado: any;
  imagengrande: any;
  activo: boolean[] = [true];
  mostrarimagen: boolean = true;
  puja: number = 0;
  error: string = '';
  valido: boolean = false;
  puja_aumento: number = 0;
  //datos de Alianza
  tipo: string = '';
  marca: string = '';
  modelo: string = '';
  color: string = '';
  anio: number = 0;
  placa: string = '';

  ngOnInit() {
    this.nombre = parseInt(this.titulo, 10);
    this.productosService.getProductoById(this.nombre).subscribe({
      next: (productoData) => {
        this.producto = productoData;
        this.puja_actual = this.producto['puja_actual'];
        this.categorias = this.producto['categoria'];
        this.fecha_fin = this.producto['fecha_fin'];
        this.name = this.producto['titulo'];
        //this.fecha=this.formatearFecha(this.fecha_fin);
        this.aumento = this.producto['aumento'];
        this.imagenes = this.producto['imagenes'];
        this.imagengrande = this.producto['imagenes'][0];
        this.puja_aumento = this.puja_actual + this.aumento;
        this.puja = this.puja_aumento;
        this.tipo = this.producto['tipo'];
        this.marca = this.producto['marca'];
        this.modelo = this.producto['modelo'];
        this.color = this.producto['color'];
        this.anio = this.producto['anio'];
        this.placa = this.producto['placa'];
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
    this.imagengrande = this.imagenes[index];
    this.mostrarimagen = false;
    this.mostrarimagen = true;
    this.activo[index] = true;
  }

  enviarpuja() {
    if (!this.puja) {
      this.valido = false;
      this.error = 'Ingrese un valor numérico';
      Swal.fire({
        title: 'Error!',
        text: this.error,
        icon: 'error',
        timer: 3000, // Tiempo en milisegundos (en este caso, 3 segundos)
        timerProgressBar: true, // Muestra una barra de progreso
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    } else if (this.puja < this.puja_aumento) {
      this.valido = false;
      this.error = 'La puja debe ser mayor o igual a ' + this.puja_aumento;
      Swal.fire({
        title: 'Error!',
        text: this.error,
        icon: 'error',
        timer: 3000, // Tiempo en milisegundos (en este caso, 3 segundos)
        timerProgressBar: true, // Muestra una barra de progreso
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    } else {
      this.valido = true;
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
}
