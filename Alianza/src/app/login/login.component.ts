import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { core } from '@angular/compiler';
import { LoginRequest } from '../interfaces/login-request';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioinvalido:boolean=false;
  arrayerrores: { [key: string]: string } = {};
  loginError:string='';
  loginForm:FormGroup=new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', Validators.required)
  });
  constructor(private router: Router, private loginService:UsuarioService) { }

  enviarlogin(){
    const correoControl = this.loginForm.get('correo');
    this.arrayerrores={};
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData)=>{
          console.log(userData);
          this.router.navigate(['/mi-perfil']);
          this.loginForm.reset();
        },
        error:(errorData)=>{
          console.error(errorData);
          this.loginError=errorData;
        },
        complete:()=>{
          console.info('Login completo');
        }
      });
    } else {
      if(this.loginForm.value.correo==''){
        this.arrayerrores['correovacio']='Ingrese su Correo Electrónico';
      }
      if (correoControl && correoControl.invalid && correoControl.hasError('email')) {
        this.arrayerrores['correoinvalido']='Correo electrónico inválido';
      }
      if(this.loginForm.value.password==''){
        this.arrayerrores['password']='Ingrese su Contraseña';
      }
      this.usuarioinvalido=true;
    }
  }
}
