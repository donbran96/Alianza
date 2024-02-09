import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';
import { core } from '@angular/compiler';
import { LoginRequest } from '../interfaces/login-request';
import Swal from 'sweetalert2';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userInvalid: boolean = false;
  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };
  loginForm: FormGroup = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private loginService: UsuarioService) {}

  sendLogin() {
    if (this.loginForm.valid) {
      // Crear un nuevo objeto FormData
      const formData = new FormData();

      // Agregar datos al FormData
      formData.append('mail', this.loginForm.get('mail')?.value);
      formData.append('password', this.loginForm.get('password')?.value);

      this.loginService.login(formData).subscribe({
        next: (response) => {
          console.log('Respuesta de la API - LOGIN: ', response);
          if (response.success) {
            this.loginForm.reset();
            this.message.title = 'Enviado';
            this.message.text = 'Datos Correctos.';
            this.message.icon = 'success';
            this.showMessage();
            this.router.navigate(['/mi-perfil']);
          } else {
            this.message.title = 'Error!';
            this.message.text =
              'Credenciales incorrectas, intentelo de nuevo.';
            this.message.icon = 'error';
            this.showMessage();
          }
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
          this.message.title = 'Error!';
          this.message.text =
            'Error al comunicarse con el servidor, intentelo de nuevo.';
          this.message.icon = 'error';
          this.showMessage();
        },
      });
    } else {
      this.userInvalid = true;
    }
  }

  showMessage(): void {
    Swal.fire({
      title: this.message.title,
      text: this.message.text,
      icon: this.message.icon,
      timer: 5000, // Tiempo en milisegundos (en este caso, 3 segundos)
      timerProgressBar: true, // Muestra una barra de progreso
      showConfirmButton: false, // Oculta el botón de confirmación
    });
  }
}
