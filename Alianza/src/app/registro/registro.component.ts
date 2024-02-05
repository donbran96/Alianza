import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  imagenesPreviaURL: (string | ArrayBuffer | null)[] = [];

  usuarioinvalido: boolean = false;
  arrayerrores: { [key: string]: string } = {};
  registroForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.min(5)]),
    ci: new FormControl('', [Validators.required, Validators.min(6)]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.min(6)]),
    imagenes: new FormArray([]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  enviarregistro() {
    const correoControl = this.registroForm.get('correo');
    this.arrayerrores = {};
    if (this.registroForm.valid) {
      //this.router.navigate(['/mi-perfil']);

      console.log(this.registroForm.value);
      console.log('enviando datos');
    } else {
      if (this.registroForm.value.nombre == '') {
        this.arrayerrores['nombre'] = 'Ingrese su Nombre completo';
      }
      if (this.registroForm.value.ci == '') {
        this.arrayerrores['ci'] = 'Ingrese su Carnet de identidad';
      }
      if (this.registroForm.value.correo == '') {
        this.arrayerrores['correovacio'] = 'Ingrese su Correo Electrónico';
      }
      if (
        correoControl &&
        correoControl.invalid &&
        correoControl.hasError('email')
      ) {
        this.arrayerrores['correoinvalido'] = 'Correo electrónico inválido';
      }
      if (this.registroForm.value.telefono == '') {
        this.arrayerrores['telefono'] = 'Ingrese su Teléfono';
      }
      if (this.registroForm.value.password == '') {
        this.arrayerrores['password'] = 'Ingrese su contraseña';
      }
      if (this.imagenesPreviaURL.length != 2) {
        this.arrayerrores['imagenes'] = 'Ingrese 2 imagenes - .JPG o .PNG';
      }
      this.usuarioinvalido = true;
    }
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.mostrarVistaPrevia(files);
  }

  mostrarVistaPrevia(files: FileList) {
    const maxImages = 2;
    const imagenesFormArray = this.registroForm.get('imagenes') as FormArray;

    for (
      let i = 0;
      i < files.length && this.imagenesPreviaURL.length <= maxImages && files.length + this.imagenesPreviaURL.length <= maxImages;
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
    const imagenesFormArray = this.registroForm.get('imagenes') as FormArray;

    // Eliminar el control en el índice proporcionado
    imagenesFormArray.removeAt(index);
    this.imagenesPreviaURL.splice(index, 1);
  }
}
