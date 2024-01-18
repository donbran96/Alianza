import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  usuario: Usuario = {
    nombre: 'Nombre Ejemplo',
    ci: 123456789,
    correo: 'ejemplo@correo.com',
    telefono: 987654321,
    password: 'clave123'
  };
  constructor() { }
  getusuario():Usuario{
    return this.usuario;
  }
}
