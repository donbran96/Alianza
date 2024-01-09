import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent {
  hoveractivo:boolean[]=[];
  pintarcaja(index:number){
    this.hoveractivo[index]=true;
  }
  despintarcaja(index:number){
    this.hoveractivo[index]=false;
  }
}
