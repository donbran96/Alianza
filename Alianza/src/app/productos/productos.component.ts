import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
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

  page: number = 0;
  totalPages: number = 0;
  pageSize: number = 1; // Define el número de productos por página

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Suscríbete a los cambios de la ruta
    this.route.params.subscribe((params) => {
      this.cargarCategorias();
      this.cargarAnios();
      this.cargarMeses();
      this.cargarOrden();

      this.filtros.estado = params['id_subasta']!=null?params['id_subasta']:0;

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
    this.productosService.getProductosByFilter(this.filtros).subscribe({
      next: (productosData) => {
        this.productos = productosData;
        this.totalPages = Math.ceil(this.productos.length / this.pageSize);
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {
        console.info('Productos obtenidos');
      },
    });
  }

  nextPage(){
    if(this.page < this.productos.length){
      this.page += this.pageSize
      //this.filtrarProductos()
      //this.productos.splice(this.page, this.page + this.pageSize)
      console.log(this.page)
    }
  }

  prevPage(){
    if(this.page > 0){
      this.page -= this.pageSize;
      //this.filtrarProductos()
      //this.productos.splice(this.page, this.page - this.pageSize)
      console.log(this.page)
    }
  }
}
