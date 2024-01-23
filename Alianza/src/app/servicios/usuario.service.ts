import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioConectado:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  usuarioDatos:BehaviorSubject<Usuario>=new BehaviorSubject<Usuario>({mensaje:'',id:'',nombre:'',ci:0,correo:'',telefono:0});
  constructor(private http:HttpClient) { }
  login(credenciales:LoginRequest):Observable<Usuario>{
    return this.http.get<Usuario>('../../assets/data.json').pipe(
      tap((userData:Usuario)=>{
        this.usuarioConectado.next(true);
        this.usuarioDatos.next(userData);
      }),
      catchError(this.handleError)
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
  get UserData():Observable<Usuario>{
    return this.usuarioDatos.asObservable();
  }
  get UserLogged():Observable<boolean>{
    return this.usuarioConectado.asObservable();
  }
}
