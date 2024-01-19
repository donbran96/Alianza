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
  arrayerrores: { [key: string]: string } = {};
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
    this.arrayerrores={};
    if (this.registroForm.valid) {
      //this.router.navigate(['/mi-perfil']);
    } else {
      if(this.registroForm.value.nombre==''){
        this.arrayerrores['nombre']='Ingrese su Nombre completo';
      }
      if(this.registroForm.value.ci==''){
        this.arrayerrores['ci']='Ingrese su Carnet de identidad';
      }
      if(this.registroForm.value.correo==''){
        this.arrayerrores['correovacio']='Ingrese su Correo Electrónico';
      }
      if (correoControl && correoControl.invalid && correoControl.hasError('email')) {
        this.arrayerrores['correoinvalido']='Correo electrónico inválido';
      }
      if(this.registroForm.value.telefono==''){
        this.arrayerrores['telefono']='Ingrese su Teléfono';
      }
      if(this.registroForm.value.fotocopia==''){
        this.arrayerrores['fotocopia']='Ingrese su Fotocopia de Carnet de Identidad';
      }
      if(this.registroForm.value.password==''){
        this.arrayerrores['password']='Ingrese su contraseña';
      }
      this.usuarioinvalido=true;
    }
  }
}
