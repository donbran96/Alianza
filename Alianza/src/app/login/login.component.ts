import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioinvalido:boolean=false;
  errores:string[]=[];
  loginForm:FormGroup=new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', Validators.required)
  });
  constructor(private router: Router) { }

  enviarlogin(){
    const correoControl = this.loginForm.get('correo');
    this.errores = [];
    if (this.loginForm.valid) {
      this.router.navigate(['/mi-perfil']);
    } else {
      if(this.loginForm.value.correo==''){
        this.errores.push('Ingrese su Correo Electrónico');
      }
      if (correoControl && correoControl.invalid && correoControl.hasError('email')) {
        this.errores.push('Correo electrónico inválido');
      }
      if(this.loginForm.value.password==''){
        this.errores.push('Ingrese su Contraseña');
      }
      this.usuarioinvalido=true;
    }
  }
}
