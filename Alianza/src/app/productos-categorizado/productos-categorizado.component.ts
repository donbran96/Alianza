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

@Component({
  selector: 'app-productos-categorizado',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './productos-categorizado.component.html',
  styleUrl: './productos-categorizado.component.css',
})
export class ProductosCategorizadoComponent {
  @Input('categoria') categoria = '';
  productosService: ProductosService = inject(ProductosService);
  productos: Productos[] = [];

  submenu: Boolean = false;
  mantenerHover: Boolean = false;

  categoriasService: CategoriasService = inject(CategoriasService);
  categorias: Categorias[] = [];

  timeService: TimesService = inject(TimesService);
  anios: Anios[] = [];
  meses: Meses[] = [];

  filtros:Filtros = {
    categoria: '',
    marca: '',
    anio: 0,
    mes: 0,
  };

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Suscríbete a los cambios de la ruta
    this.route.params.subscribe((params) => {
      // Obtén el nuevo valor de la categoría
      this.categoria = params['categoria'];
      this.filtros.categoria = params['categoria'];

      // Llama a la función que carga los productos
      this.filtrarProductos();
      this.cargarAnios();
      this.cargarMeses();
    });

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

  cargarProductos() {
    this.productosService.getProductosByCategory(this.categoria).subscribe({
      next: (productosData) => {
        this.productos = productosData;
        console.log(this.productos);
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Productos obtenidos');
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

  filtrarProductos() {
    this.categoria = this.filtros.categoria??'';
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
