import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { Router, RouterLink } from '@angular/router';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioUpdate } from '../interfaces/usuario-update';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  conectado:boolean=false;
  userData:Usuario={
    mensaje: '',
    id: '',
    nombre: '',
    ci: 0,
    correo: '',
    telefono: 0,
    subastas: []
  };
  editar:boolean=false;
  usuarioconectado:boolean=false;
  subastas:number[]=[];
  productosSubastas:Productos[]=[];
  actualizado:string='';
  updateError:string='';
  usuarioinvalido:boolean=true;
  edicionForm:FormGroup=new FormGroup({
    nombre: new FormControl('', Validators.required),
    ci: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', Validators.required)
  });
  arrayerrores: { [key: string]: string } = {};
  constructor(private loginService:UsuarioService, private Router:Router, private productosService:ProductosService){}
  ngOnInit():void{
    this.loginService.UserLogged.subscribe({
      next:(userLogedIn)=>{
        this.conectado=userLogedIn;
      }
    });
    this.loginService.UserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
        this.subastas=userData.subastas;
        this.edicionForm.patchValue({
          nombre:userData.nombre,
          ci:userData.ci,
          correo:userData.correo,
          telefono:userData.telefono
        })
      }
    });
    this.productosService.getProductosById(this.subastas).subscribe({
      next:(productosSubasta)=>{
        this.productosSubastas=productosSubasta;
      }
    })
  }
 
  activaredicion(modo:boolean){
    this.editar=modo;
  }
  logout(){
    this.loginService.logout();
    this.Router.navigate(['/acceso']);
  }
  actualizarUsuario(){
    const correoControl = this.edicionForm.get('correo');
    this.arrayerrores={};
    if (this.edicionForm.valid) {
      this.loginService.usuarioUpdate(this.edicionForm.value as UsuarioUpdate).subscribe({
        next:(respuesta)=>{
          this.actualizado=respuesta;
          this.activaredicion(false);
          this.userData.nombre=this.edicionForm.value.nombre;
          this.userData.ci=this.edicionForm.value.ci;
          this.userData.correo=this.edicionForm.value.correo;
          this.userData.telefono=this.edicionForm.value.telefono;
        },
        error:(errorData)=>{
          this.updateError=errorData;
        },
        complete:()=>{
          console.info('Usuario Actualizado');
        }
      });
    } else {
      if(this.edicionForm.value.nombre==''){
        this.arrayerrores['nombre']='Ingrese un nombre';
      }
      if(this.edicionForm.value.ci==null){
        this.arrayerrores['ci']='Ingrese su carnet de identidad';
      }
      if(this.edicionForm.value.correo==''){
        this.arrayerrores['correovacio']='Ingrese correo electrónico';
      }
      if (correoControl && correoControl.invalid && correoControl.hasError('email')) {
        this.arrayerrores['correoinvalido']='Correo electrónico inválido';
      }
      if(this.edicionForm.value.telefono==null){
        this.arrayerrores['telefono']='Ingrese su Teléfono';
      }
      this.usuarioinvalido=true;
    }
  }
  cancelaredicion(){
    this.activaredicion(false);
    this.actualizado="";
    this.edicionForm.reset();
    this.edicionForm.patchValue({
      nombre:this.userData?.nombre,
      ci:this.userData?.ci,
      correo:this.userData?.correo,
      telefono:this.userData?.telefono
    })
  }
}
