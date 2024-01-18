import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuarioinvalido:boolean=false;
  errores:string[]=[];
  registroForm:FormGroup=new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    ci: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required,Validators.email]),
    telefono: new FormControl('', Validators.required),
    fotocopia: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  enviarregistro(){
    const correoControl = this.registroForm.get('correo');
    this.errores = [];
    if (this.registroForm.valid) {
      //this.router.navigate(['/mi-perfil']);
    } else {
      if(this.registroForm.value.nombre==''){
        this.errores.push('Ingrese su Nombre completo');
      }
      if(this.registroForm.value.ci==''){
        this.errores.push('Ingrese su Carnet de identidad');
      }
      if(this.registroForm.value.correo==''){
        this.errores.push('Ingrese su Correo Electrónico');
      }
      if (correoControl && correoControl.invalid && correoControl.hasError('email')) {
        this.errores.push('Correo electrónico inválido');
      }
      if(this.registroForm.value.telefono==''){
        this.errores.push('Ingrese su Teléfono');
      }
      if(this.registroForm.value.fotocopia==''){
        this.errores.push('Ingrese su Fotocopia de Carnet de Identidad');
      }
      if(this.registroForm.value.password==''){
        this.errores.push('Ingrese su Contraseña');
      }
      this.usuarioinvalido=true;
    }
  }
}
