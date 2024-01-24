import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioConectado:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  usuarioDatos:BehaviorSubject<Usuario>=new BehaviorSubject<Usuario>({mensaje:'',id:'',nombre:'',ci:0,correo:'',telefono:0,subastas:[]});
  constructor(private http:HttpClient) {
    this.usuarioConectado=new BehaviorSubject<boolean>(sessionStorage.getItem("usuario")!=null);
    this.usuarioDatos=new BehaviorSubject<Usuario>(JSON.parse(sessionStorage.getItem("usuario")||'{}'));
  }
  login(credenciales:LoginRequest):Observable<Usuario>{
    return this.http.get<Usuario>(environment.urlApi).pipe(
      tap((userData:Usuario)=>{
        sessionStorage.setItem('usuario', JSON.stringify(userData));

        this.usuarioConectado.next(true);
        this.usuarioDatos.next(userData);
      }),
      catchError(this.handleError)
    );
  }
  logout(){
    sessionStorage.removeItem("usuario");
    this.usuarioConectado.next(false);
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
