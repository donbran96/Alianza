import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  usuarioDatos: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({
    id: '',
    nombre: '',
    apellido: '',
    ci: 0,
    correo: '',
    telefono: 0,
    subastas: [],
    url_img_1: '',
    url_img_2: '',
  });

  constructor(private http: HttpClient) {
    // Verificar si sessionStorage está disponible antes de utilizarlo
    if (typeof sessionStorage !== 'undefined') {
      this.usuarioConectado = new BehaviorSubject<boolean>(
        sessionStorage.getItem('user') != null
      );
      this.usuarioDatos = new BehaviorSubject<Usuario>(
        JSON.parse(sessionStorage.getItem('user') || '{}')
      );
    }
  }

  login(formData: FormData): Observable<any> {
    return this.http.post<any>('proposer/login_proposer', formData).pipe(
      map((response) => {
        // Guardar el usuario y el token en sessionStorage
        sessionStorage.setItem('user', JSON.stringify(response.data));
        sessionStorage.setItem('token', JSON.stringify(response.token));
        // Notificar a los observadores sobre el estado de conexión del usuario
        this.usuarioConectado.next(true);
        
        // Actualizar los datos del usuario en el servicio
        this.usuarioDatos.next(this.ModelToInterface(response.data));
  
        // Devolver la respuesta sin modificaciones
        return response;
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    this.usuarioConectado.next(false);
  }

  usuarioUpdate(userData: UsuarioUpdate): Observable<any> {
    return this.http
      .get<any>('http://localhost:4200/assets/data-usuarioupdate.json')
      .pipe(
        catchError(this.handleError),
        map((respuesta) => respuesta.respuesta)
      );
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
    return this.usuarioDatos.asObservable();
  }

  get UserLogged(): Observable<boolean> {
    return this.usuarioConectado.asObservable();
  }

  registerUser(formData: FormData): Observable<any> {
    // Realizar la solicitud HTTP
    return this.http.post('/proposer/register_proposer', formData);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<any>('proposer/list_proposer').pipe(
      map((response) => {
        // Mapear la respuesta a un array de objetos Usuario
        return response.data.map((data: any) => {
          return this.ModelToInterface(data);
        });
      }),
      catchError(this.handleError)
    );
  }

  ModelToInterface(data: any): Usuario{
    return {
      id:data.id,
      nombre:data.nombre,
      apellido: data.apellido,
      ci: data.ci,
      correo: data.correo,
      telefono: data.telefono,
      url_img_1: data.url_img_1,
      url_img_2: data.url_img_2,
      subastas: []
      // Puedes incluir otros atributos de userData que coincidan con los de la interfaz Usuario
    } as Usuario;
  }
}
