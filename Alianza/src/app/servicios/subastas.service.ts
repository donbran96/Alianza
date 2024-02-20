import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Subastas } from '../interfaces/subastas';

@Injectable({
  providedIn: 'root',
})

export class SubastaService {
  constructor(private http: HttpClient) {}
  getSubastas(): Observable<Subastas[]> {
    return this.http
      .get<Subastas[]>('../../assets/data-subastas.json')
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
