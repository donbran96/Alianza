import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, filter, map, throwError } from 'rxjs';
import { Categorias } from '../interfaces/categorias';
import { Meses } from '../interfaces/meses';
import { Anios } from '../interfaces/anios';

@Injectable({
  providedIn: 'root',
})
export class TimesService {
  constructor(private http: HttpClient) {}
  getMeses(): Observable<Meses[]> {
    return this.http
      .get<Meses[]>('../../assets/data-meses.json')
      .pipe(catchError(this.handleError));
  }

  getAnios(): Observable<Anios[]> {
    return this.http
      .get<Anios[]>('../../assets/data-anios.json')
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
