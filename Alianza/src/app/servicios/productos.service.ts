import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/productos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, map, throwError } from 'rxjs';
import { Filtros } from '../interfaces/filtros';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}
  getProductos(): Observable<Productos[]> {
    return this.http
      .get<Productos[]>('../../assets/data-products-act.json')
      .pipe(catchError(this.handleError));
  }

  /*getProductosByCategory(categoria: string): Observable<Productos[]> {
    return this.http.get<Productos[]>('../../assets/data-products-act.json').pipe(
      catchError(this.handleError),
      filter((productos: Productos[]) => !!productos),
      // Filtra la lista para encontrar los productos con los ID proporcionados
      map((productos: Productos[]) => {
        if (categoria != 'todos') {
          productos.filter((producto) =>
            categoria.includes(producto.categoria)
          );
        }
        return productos;
      })
    );
  }

  getProductosByFilter(filtros: Filtros): Observable<Productos[]> {
    return this.http.get<Productos[]>('../../assets/data-products-act.json').pipe(
      catchError(this.handleError),
      map((productos: Productos[]) => {
        if (filtros.categoria != '' && filtros.categoria != 'todos') {
          productos = productos.filter(
            (producto) => producto.categoria === filtros.categoria
          );
        }
        if (filtros.anio != 0) {
          productos = productos.filter(
            (producto) =>
              new Date(producto.fecha_fin).getFullYear().toString() ===
              filtros.anio?.toString()
          );
        }
        if (filtros.mes != 0) {
          productos = productos.filter(
            (producto) =>
              (new Date(producto.fecha_fin).getMonth() + 1).toString() ===
              filtros.mes?.toString()
          );
        }
        return productos;
      })
    );
  }*/

  getProductoById(id: number): Observable<Productos> {
    return this.http
      .get<Productos[]>('../../assets/data-products-act.json')
      .pipe(
        catchError(this.handleError),
        filter((productos: any) => !!productos),
        // Filtra la lista para encontrar el producto con el ID proporcionado
        map((productos) =>
          productos.find((producto: { id: number }) => producto.id === id)
        )
      );
  }

  getProductosById(array_id: number[]): Observable<Productos[]> {
    return this.http
      .get<Productos[]>('../../assets/data-products-act.json')
      .pipe(
        catchError(this.handleError),
        filter((productos: Productos[]) => !!productos),
        // Filtra la lista para encontrar los productos con los ID proporcionados
        map((productos: Productos[]) =>
          productos.filter((producto) => array_id.includes(producto.id))
        )
      );
  }

  getProductosByFilter(filtros: Filtros): Observable<Productos[]> {
    return this.http
      .get<Productos[]>('../../assets/data-products-act.json')
      .pipe(
        catchError(this.handleError),
        map((productos: Productos[]) => {
          if (filtros.categoria != '' && filtros.categoria != 'todos') {
            productos = productos.filter(
              (producto) => producto.categoria === filtros.categoria
            );
          }
          if (filtros.anio != 0) {
            productos = productos.filter(
              (producto) =>
                new Date(producto.fecha_fin).getFullYear().toString() ===
                filtros.anio?.toString()
            );
          }
          if (filtros.mes != 0) {
            productos = productos.filter(
              (producto) =>
                (new Date(producto.fecha_fin).getMonth() + 1).toString() ===
                filtros.mes?.toString()
            );
          }
          if (filtros.estado != 0 && filtros.estado != null) {
            productos = productos.filter(
              (producto) =>
                producto.estado.toString() === filtros.estado?.toString()
            );
          }
          if (filtros.palabra != '') {
            console.log("palabra")
            const palabraMinuscula = filtros.palabra.toLowerCase();
            productos = productos.filter((producto) =>
              Object.values(producto).some(
                (propiedad) =>
                  typeof propiedad === 'string' &&
                  propiedad.toLowerCase().includes(palabraMinuscula)
              )
            );
          }
          productos = this.ordenarProductos(productos, filtros);
          return productos;
        })
      );
  }

  private ordenarProductos(
    productos: Productos[],
    filtros: Filtros
  ): Productos[] {
    switch (parseInt(filtros.orden.toString())) {
      case 1: // Precio Descendente
        console.log('Entro 1');
        productos.sort((a, b) => b.precio_base - a.precio_base);
        console.log(productos);
        break;
      case 2: // Precio Ascendente
        productos.sort((a, b) => a.precio_base - b.precio_base);
        break;
      case 3: // A-Z
        productos.sort((a, b) =>
          a.nombre_comercial > b.nombre_comercial ? 1 : -1
        );
        break;
      case 4: // Z-A
        productos.sort((a, b) =>
          a.nombre_comercial < b.nombre_comercial ? 1 : -1
        );
        break;
      default:
        // No hacer ningún cambio si el tipo de orden no está definido
        break;
    }
    return productos;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
