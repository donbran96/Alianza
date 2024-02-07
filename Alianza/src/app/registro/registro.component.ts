import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Route, Router } from '@angular/router';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  constructor(private http: HttpClient, private router: Router) {}

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  userService: UsuarioService = inject(UsuarioService);

  imagenesPreviaURL: (string | ArrayBuffer | null)[] = [];

  userInvalid: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.validateNumber,
    ]),
    images: new FormArray([], [Validators.required, this.validateArrayLength]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  sendRegister() {
    if (this.registerForm.valid) {
      //console.log(this.registerForm.value);
      this.sendData();
    } else {
      this.userInvalid = true;
    }
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    const allowedExtensions = ['.jpg', '.jpeg', '.png']; // Extensiones permitidas

    if (this.imagenesPreviaURL.length < 2) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const extension = file.name.split('.').pop()?.toLowerCase(); // Obtener la extensión del archivo

        if (extension && allowedExtensions.includes('.' + extension)) {
          this.mostrarVistaPrevia(file);
        } else {
          // Mostrar un mensaje de error si la extensión no está permitida
          this.message.title = 'Error!';
          this.message.text =
            'Solo se permiten archivos con extensiones .jpg, .jpeg o .png.';
          this.message.icon = 'error';
          this.showMessage();
          return; // Salir del método si se encuentra un archivo no permitido
        }
      }
    } else {
      this.message.title = 'Error!';
      this.message.text = 'Error solo se permiten un máximo de 2 imágenes.';
      this.message.icon = 'error';
      this.showMessage();
    }
  }

  mostrarVistaPrevia(file: File) {
    const maxImages = 2;
    const imagenesFormArray = this.registerForm.get('images') as FormArray;

    if (this.imagenesPreviaURL.length + 1 <= maxImages) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesPreviaURL.push(e.target.result);
        // Crear un nuevo FormControl con el archivo y la URL
        const imageControl = new FormControl({ file });
        imagenesFormArray.push(imageControl);
      };
      reader.readAsDataURL(file);
    } else {
      this.message.title = 'Error!';
      this.message.text = 'Error solo se permiten un máximo de 2 imágenes.';
      this.message.icon = 'error';
      this.showMessage();
    }
  }

  eliminarImagen(index: number, event: Event) {
    const imagenesFormArray = this.registerForm.get('images') as FormArray;

    // Eliminar el control en el índice proporcionado
    imagenesFormArray.removeAt(index);
    this.imagenesPreviaURL.splice(index, 1);
  }

  sendData() {
    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar datos al FormData
    formData.append('name', this.registerForm.get('name')?.value);
    formData.append('surname', this.registerForm.get('surname')?.value);
    formData.append('ci', this.registerForm.get('ci')?.value);
    formData.append('mail', this.registerForm.get('mail')?.value);
    formData.append('phone', this.registerForm.get('phone')?.value);
    formData.append('password', this.registerForm.get('password')?.value);

    // Obtener el control del FormArray de imágenes
    const imagesFormArray = this.registerForm.get('images') as FormArray;

    // Iterar sobre los controles del FormArray y agregar cada archivo individualmente al FormData
    for (let i = 0; i < imagesFormArray.length; i++) {
      const imageControl = imagesFormArray.at(i) as FormControl;
      const file: File = imageControl.value.file;
      formData.append('images[]', file, file.name);
    } 

    this.userService
      .registerUser(formData)
      .subscribe({
        next: (response) => {
          this.registerForm.reset();
          this.imagenesPreviaURL = [];
          console.log('Respuesta de la API:', response);
          this.message.title = 'Enviado';
          this.message.text =
            'Datos registrados correctamente, en espera de ser verificado.';
          this.message.icon = 'success';
          this.showMessage();
          this.router.navigate(['/mi-perfil']);
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
  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

  validateArrayLength(control: AbstractControl): ValidationErrors | null {
    const value = control.value as any[]; // Castear el valor como un array
    if (value && value.length !== 2) {
      return { arrayLength: true };
    }
    return null;
  }

  showMessage(): void {
    Swal.fire({
      title: this.message.title,
      text: this.message.text,
      icon: this.message.icon,
      timer: 3000, // Tiempo en milisegundos (en este caso, 3 segundos)
      timerProgressBar: true, // Muestra una barra de progreso
      showConfirmButton: false, // Oculta el botón de confirmación
    });
  }
}
