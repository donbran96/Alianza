import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';

import {
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UsuarioUpdate } from '../interfaces/usuario-update';
import Swal from 'sweetalert2';
import { Message } from '../interfaces/message';
import { CommonModule } from '@angular/common';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  conectado: boolean = false;

  imagenesPreviaURL: (string | ArrayBuffer | null)[] = [];

  userData: Usuario = {
    id: '',
    name: '',
    surname: '',
    ci: 0,
    mail: '',
    phone: 0,
    url_img_1: '',
    url_img_2: '',
    subastas: [],
    verify: 0,
  };

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  url_api_images: string =
    GlobalConstants.appApiURL + 'assets/images/proposers/';

  usuarioconectado: boolean = false;
  subastas: number[] = [];
  productosSubastas: Productos[] = [];
  usuarioinvalido: boolean = true;

  updateForm: FormGroup = new FormGroup({
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
    images: new FormArray([], [this.validateArrayLength]),
    password: new FormControl('', [Validators.minLength(6)]),
    password_new: new FormControl('', [Validators.minLength(6)]),
  });

  constructor(
    private loginService: UsuarioService,
    private Router: Router,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.loginService.UserLogged.subscribe({
      next: (userLogedIn) => {
        this.conectado = userLogedIn;
      },
    });

    this.loginService.UserData.subscribe({
      next: (userData) => {
        this.userData = userData;
        this.subastas = userData.subastas;
        this.updateFormData();
      },
    });

    if (this.conectado) {
      const formData = new FormData();
      formData.append('id', this.userData.id!);
      this.loginService.getUser(formData).subscribe({
        next: (response) => {
          console.log('Respuesta de la API - GET_USER:', response);
          if (response.success) {
            this.updateUserData(response.data);
            this.updateFormData();
          } else {
            this.message.title = 'Error!';
            this.message.text = 'Token invalido.';
            this.message.icon = 'error';
            this.showMessage();
            this.loginService.logout();
            this.Router.navigate(['/acceso']);
          }
        },
        error: (error) => {
          console.error('Error al enviar los datos - GET_USER:', error);
          this.message.title = 'Error!';
          this.message.text = 'Sesion Expirada.';
          this.message.icon = 'error';
          this.showMessage();
          this.loginService.logout();
          this.Router.navigate(['/acceso']);
        },
      });
    }

    this.productosService.getProductosById(this.subastas).subscribe({
      next: (productosSubasta) => {
        this.productosSubastas = productosSubasta;
      },
    });
  }

  logout() {
    this.loginService.logout();
    this.Router.navigate(['/acceso']);
  }

  updateUser() {
    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar datos al FormData
    formData.append('id', this.userData.id);
    formData.append('name', this.updateForm.get('name')?.value);
    formData.append('surname', this.updateForm.get('surname')?.value);
    formData.append('ci', this.updateForm.get('ci')?.value);
    formData.append('mail', this.updateForm.get('mail')?.value);
    formData.append('phone', this.updateForm.get('phone')?.value);
    formData.append('password', this.updateForm.get('password')?.value);
    formData.append('new_password', this.updateForm.get('password_new')?.value);

    // Obtener el control del FormArray de imágenes
    const imagesFormArray = this.updateForm.get('images') as FormArray;
    // Iterar sobre los controles del FormArray y agregar cada archivo individualmente al FormData
    for (let i = 0; i < imagesFormArray.length; i++) {
      const imageControl = imagesFormArray.at(i) as FormControl;
      const file: File = imageControl.value.file;
      formData.append('images[]', file, file.name);
    }

    if (imagesFormArray.length == 0) {
      formData.append('images[]', '[]');
    }

    this.loginService.updateUser(formData).subscribe({
      next: (response) => {
        console.log('Respuesta de la API - UPDATE_USER:', response);
        if (response.success) {
          this.updateUserData(response.data);
          this.imagenesPreviaURL = [];
          this.updateForm.patchValue({
            images: [],
            password: '',
            password_new: '',
          });
          this.message.title = 'Actualizado';
          this.message.text = 'Datos actaulizados correctamente.';
          this.message.icon = 'success';
          this.showMessage();
        } else {
          this.message.title = 'Error!';
          this.message.text = response.messages;
          this.message.icon = 'error';
          this.showMessage();
        }
      },
      error: (errorData) => {
        this.message.title = 'Error!';
        this.message.text = 'Error en la comunicación con el servidor.';
        this.message.icon = 'error';
        this.showMessage();
        console.log(errorData);
      },
    });
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
    const imagenesFormArray = this.updateForm.get('images') as FormArray;

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
    const imagenesFormArray = this.updateForm.get('images') as FormArray;

    // Eliminar el control en el índice proporcionado
    imagenesFormArray.removeAt(index);
    this.imagenesPreviaURL.splice(index, 1);
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

  validateNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (isNaN(value)) {
      return { notANumber: true };
    }
    return null;
  }

  validateArrayLength(control: AbstractControl): ValidationErrors | null {
    const value = control.value as any[]; // Castear el valor como un array
    if (value && value.length !== 2 && value.length != 0) {
      return { arrayLength: true };
    }
    return null;
  }

  updateFormData(): void {
    this.updateForm.patchValue({
      name: this.userData.name,
      surname: this.userData.surname,
      ci: this.userData.ci,
      mail: this.userData.mail,
      phone: this.userData.phone,
    });
  }

  updateUserData(data: any) {
    this.userData.name = data.nombre;
    this.userData.surname = data.apellido;
    this.userData.ci = data.ci;
    this.userData.mail = data.correo;
    this.userData.phone = data.telefono;
    if (this.imagenesPreviaURL.length != 0) {
      this.userData.url_img_1 = data.url_img_1;
      this.userData.url_img_2 = data.url_img_2;
    }
  }
}
