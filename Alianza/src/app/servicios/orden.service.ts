import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Orden } from '../interfaces/orden';

@Injectable({
  providedIn: 'root',
})

export class OrdenService {
  constructor(private http: HttpClient) {}
  getOrden(): Observable<Orden[]> {
    return this.http
      .get<Orden[]>('../../assets/data-orden.json')
      .pipe(catchError(this.handleError));
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
