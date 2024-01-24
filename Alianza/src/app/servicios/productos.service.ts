import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/productos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http:HttpClient) { 
    
  }
  getProductos():Observable<Productos[]>{
    return this.http.get<Productos[]>('../../assets/data-products.json').pipe(
      
      catchError(this.handleError)
    );
  }
  getProductoById(id: number): Observable<Productos> {
    return this.http.get<Productos[]>('../../assets/data-products.json').pipe(
      catchError(this.handleError),
      filter((productos: any) => !!productos),
      // Filtra la lista para encontrar el producto con el ID proporcionado
      map(productos => productos.find((producto: { id: number; }) => producto.id === id))
    );
  }


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retornó el código de estado ',error.status,error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
