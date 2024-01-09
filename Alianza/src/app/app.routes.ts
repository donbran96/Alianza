import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { SubastasComponent } from './subastas/subastas.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductosDetalleComponent } from './productos-detalle/productos-detalle.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'productos', component: SubastasComponent},
    {path: 'nosotros', component: QuienesSomosComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'productos/:titulo', component: ProductosDetalleComponent},
    {path: '**', component: Error404Component}
];
