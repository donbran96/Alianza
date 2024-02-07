import { Component, inject } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-top-clientes-ofertas',
  standalone: true,
  imports: [],
  templateUrl: './top-clientes-ofertas.component.html',
  styleUrl: './top-clientes-ofertas.component.css'
})
export class TopClientesOfertasComponent {
  userService: UsuarioService = inject(UsuarioService);
  list_proposers: Usuario[] = [];
  ngOnInit(){
    this.userService.getUsers().subscribe({
      next:(proposersData)=>{
        this.list_proposers=proposersData;
      },
      error:(errorData)=>{
        console.error(errorData);
      },
      complete:()=>{
        console.info('Clientes obtenidos');
      }
    });
  }
}
