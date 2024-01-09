import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
   year= new Date().getFullYear();
   correo: string= 'info@alianzaseguros.com';
   telefono:string='800-10-6622';
}
