import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SubastasComponent } from './subastas/subastas.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductosDetalleComponent } from './productos-detalle/productos-detalle.component';
import { Error404Component } from './error404/error404.component';
import { AccesoComponent } from './acceso/acceso.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductosComponent } from './productos/productos.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProductosMesActualComponent } from './productos-mes-actual/productos-mes-actual.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'subastas/productos', component: ProductosComponent },
  { path: 'subastas/:id_subasta/productos', component: ProductosComponent },
  { path: 'subastas/productos/:id_producto', component: ProductosDetalleComponent },
  { path: 'subastas/:id_subasta/productos/:id_producto', component: ProductosDetalleComponent },
  { path: 'nosotros', component: QuienesSomosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'acceso', component: AccesoComponent },
  { path: 'mi-perfil', component: PerfilComponent },
  { path: 'recuperar-contrasena', component: ForgotPasswordComponent },
  /*{
    path: 'subastas/productos/categoria/:categoria',
    component: ProductosCategorizadoComponent,
  },*/
  { path: '**', component: Error404Component },
];
