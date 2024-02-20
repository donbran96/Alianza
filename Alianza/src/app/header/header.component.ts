import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubastaService } from '../servicios/subastas.service';
import { Subastas } from '../interfaces/subastas';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  submenu:boolean=false;
  mantenerHover:boolean=false;

  subastasService: SubastaService = inject(SubastaService);;
  subastas: Subastas[] = [];

  ngOnInit() {
    this.subastasService.getSubastas().subscribe({
      next:(data)=>{
        this.subastas=data;
      },
      error:(errorData)=>{
        console.error(errorData);
      },
      complete:()=>{
        console.info('Productos obtenidos');
      }
    });
  }

  mostrarSubmenu(valor:boolean){
    this.submenu=valor;
    //console.log(this.submenu);
  }

  activarHover(valor:boolean){
    this.mantenerHover=valor;
  }
}
