import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError,
  BehaviorSubject,
  tap,
  map,
} from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { environment } from '../../environments/environment';
import { UsuarioUpdate } from '../interfaces/usuario-update';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarioConectado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  user: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({
    id: '',
    name: '',
    surname: '',
    ci: 0,
    mail: '',
    phone: 0,
    subastas: [],
    url_img_1: '',
    url_img_2: '',
    verify: 0,
  });

  constructor(private http: HttpClient) {
    // Verificar si sessionStorage está disponible antes de utilizarlo
    if (typeof sessionStorage !== 'undefined') {
      this.usuarioConectado = new BehaviorSubject<boolean>(
        sessionStorage.getItem('user') != null
      );
      this.user = new BehaviorSubject<Usuario>(
        JSON.parse(sessionStorage.getItem('user') || '{}')
      );
    }
  }

  login(formData: FormData): Observable<any> {
    return this.http.post<any>('proposer/login_proposer', formData).pipe(
      map((response) => {
        // Notificar a los observadores sobre el estado de conexión del usuario
        this.usuarioConectado.next(true);

        // Actualizar los datos del usuario en el servicio
        this.user.next(this.ModelToInterface(response.data));

        // Guardar el usuario y el token en sessionStorage
        sessionStorage.setItem('token', JSON.stringify(response.token));
        sessionStorage.setItem('user', JSON.stringify(this.user.value));
        sessionStorage.setItem('user_id', JSON.stringify(this.user.value.id));

        // Devolver la respuesta sin modificaciones
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    this.usuarioConectado.next(false);
  }

  /*updateUser(formData: FormData): Observable<Response> {
    return this.http.post<Response>('proposer/update_proposer', formData);
  }*/

  updateUser(formData: FormData): Observable<any> {
    return this.http.post<any>('proposer/edit_proposer_api', formData, this.getHttpHeaders());
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

  get UserData(): Observable<Usuario> {
    return this.user.asObservable();
  }

  get UserLogged(): Observable<boolean> {
    return this.usuarioConectado.asObservable();
  }

  registerUser(formData: FormData): Observable<any> {
    // Realizar la solicitud HTTP
    return this.http.post('/proposer/register_proposer', formData);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<any>('proposer/list_proposer')
    ;
  }

  ModelToInterface(data: any): Usuario {
    return {
      id: data.id,
      name: data.nombre,
      surname: data.apellido,
      ci: data.ci,
      mail: data.correo,
      phone: data.telefono,
      url_img_1: data.url_img_1,
      url_img_2: data.url_img_2,
      subastas: [],
      verify: data.verificado,
      // Puedes incluir otros atributos de userData que coincidan con los de la interfaz Usuario
    } as Usuario;
  }

  getUser(formData: FormData): Observable<any> {
    // Realizar la solicitud HTTP
    return this.http.post('/proposer/get_proposer_by_id', formData, this.getHttpHeaders()).pipe(
      map((response) => {
        // Mapear la respuesta a un array de objetos Usuario
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getHttpHeaders() {
    // Obtener el token de sessionStorage
    const tokenConComillas = sessionStorage.getItem('token');

    // Quitar las comillas del token si están presentes
    const token = tokenConComillas
      ? tokenConComillas.replace(/^"(.*)"$/, '$1')
      : '';

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
