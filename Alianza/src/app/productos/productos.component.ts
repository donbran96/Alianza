import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
import { Input } from '@angular/core';
import { Categorias } from '../interfaces/categorias';
import { CategoriasService } from '../servicios/categorias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filtros } from '../interfaces/filtros';
import { TimesService } from '../servicios/time.service';
import { Anios } from '../interfaces/anios';
import { Meses } from '../interfaces/meses';
import { OrdenService } from '../servicios/orden.service';
import { Orden } from '../interfaces/orden';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {

  productosService: ProductosService = inject(ProductosService);
  productos: Productos[] = [];

  categoriasService: CategoriasService = inject(CategoriasService);
  categorias: Categorias[] = [];

  timeService: TimesService = inject(TimesService);
  anios: Anios[] = [];
  meses: Meses[] = [];

  ordenService: OrdenService = inject(OrdenService);
  orden: Orden[] = [];

  submenu: Boolean = false;
  mantenerHover: Boolean = false;

  filtros:Filtros = {
    categoria: '',
    anio: 0,
    mes: 0,
    estado: 0,
    orden: 0,
    palabra: ''
  };

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Suscríbete a los cambios de la ruta
    this.route.params.subscribe((params) => {
      this.cargarCategorias();
      this.cargarAnios();
      this.cargarMeses();
      this.cargarOrden();

      this.filtros.estado = params['id_subasta'];
      
      this.filtrarProductos();
    });
  }

  cargarCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (categoriasData) => {
        this.categorias = categoriasData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Categorias obtenidas');
      },
    });
  }

  cargarMeses() {
    this.timeService.getMeses().subscribe({
      next: (mesesData) => {
        this.meses = mesesData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Meses obtenidos');
      },
    });
  }

  cargarAnios() {
    this.timeService.getAnios().subscribe({
      next: (aniosData) => {
        this.anios = aniosData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Años obtenidos');
      },
    });
  }

  cargarOrden() {
    this.ordenService.getOrden().subscribe({
      next: (ordenData) => {
        this.orden = ordenData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Orden obtenidos');
      },
    });
  }

  filtrarProductos() {
    console.log(this.filtros.orden);
    this.productosService.getProductosByFilter(this.filtros).subscribe({
      next: (productosData) => {
        this.productos = productosData;
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Productos obtenidos');
      },
    });
  }
}
