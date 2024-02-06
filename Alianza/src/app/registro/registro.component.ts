import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  constructor(private http: HttpClient, private router: Router) {}

  userService: UsuarioService = inject(UsuarioService);

  imagenesPreviaURL: (string | ArrayBuffer | null)[] = [];

  usuarioinvalido: boolean = false;
  arrayerrores: { [key: string]: string } = {};
  registroForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.min(3)]),
    surname: new FormControl('', [Validators.required, Validators.min(3)]),
    ci: new FormControl('', [Validators.required, Validators.min(6)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.min(6)]),
    images: new FormArray([]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  enviarregistro() {
    const mail_control = this.registroForm.get('mail');
    this.arrayerrores = {};
    if (this.registroForm.valid) {
      //this.router.navigate(['/mi-perfil']);
      this.sendData();
      this.router.navigate(['/mi-perfil']);
    } else {
      if (this.registroForm.value.nombre == '') {
        this.arrayerrores['name'] = 'Ingrese su Nombre';
      }
      if (this.registroForm.value.surname == '') {
        this.arrayerrores['surname'] = 'Ingrese su Apellido';
      }
      if (this.registroForm.value.ci == '') {
        this.arrayerrores['ci'] = 'Ingrese su Carnet de identidad';
      }
      if (this.registroForm.value.mail == '') {
        this.arrayerrores['mail_empty'] = 'Ingrese su Correo Electrónico';
      }
      if (
        mail_control &&
        mail_control.invalid &&
        mail_control.hasError('mail')
      ) {
        this.arrayerrores['mail_invalid'] = 'Correo electrónico inválido';
      }
      if (this.registroForm.value.phone == '') {
        this.arrayerrores['phone'] = 'Ingrese su Teléfono';
      }
      if (this.registroForm.value.password == '') {
        this.arrayerrores['password'] = 'Ingrese su contraseña';
      }
      if (this.imagenesPreviaURL.length != 2) {
        this.arrayerrores['images'] = 'Ingrese 2 imagenes - .JPG o .PNG';
      }
      this.usuarioinvalido = true;
    }
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.mostrarVistaPrevia(files);
    console.log(files);
  }

  mostrarVistaPrevia(files: FileList) {
    const maxImages = 2;
    const imagenesFormArray = this.registroForm.get('images') as FormArray;

    for (
      let i = 0;
      i < files.length &&
      this.imagenesPreviaURL.length <= maxImages &&
      files.length + this.imagenesPreviaURL.length <= maxImages;
      i++
    ) {
      const file: File = files[i];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenesPreviaURL.push(e.target.result);
        // Crear un nuevo FormControl con el archivo y la URL
        const imageControl = new FormControl({ file });
        imagenesFormArray.push(imageControl);
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarImagen(index: number, event: Event) {
    const imagenesFormArray = this.registroForm.get('images') as FormArray;

    // Eliminar el control en el índice proporcionado
    imagenesFormArray.removeAt(index);
    this.imagenesPreviaURL.splice(index, 1);
  }

  sendData() {
    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar datos al FormData
    formData.append('name', this.registroForm.get('name')?.value);
    formData.append('surname', this.registroForm.get('surname')?.value);
    formData.append('ci', this.registroForm.get('ci')?.value);
    formData.append('mail', this.registroForm.get('mail')?.value);
    formData.append('phone', this.registroForm.get('phone')?.value);
    formData.append('password', this.registroForm.get('password')?.value);

    // Obtener el control del FormArray de imágenes
    const imagesFormArray = this.registroForm.get('images') as FormArray;

    // Iterar sobre los controles del FormArray y agregar cada archivo individualmente al FormData
    for (let i = 0; i < imagesFormArray.length; i++) {
      const imageControl = imagesFormArray.at(i) as FormControl;
      const file: File = imageControl.value.file;
      formData.append('images[]', file, file.name);
    }

    console.log(formData);
    console.log(this.registroForm.value);
    this.userService.registerUser(formData).subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
        // Aquí puedes manejar la respuesta de la API según tus necesidades
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
        // Aquí puedes manejar el error según tus necesidades
      }
    );
  }
}
