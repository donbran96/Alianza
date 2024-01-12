import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductosService } from '../servicios/productos.service';
import { Productos } from '../interfaces/productos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-detalle.component.html',
  styleUrl: './productos-detalle.component.css'
})
export class ProductosDetalleComponent implements OnInit {
  @Input('titulo') titulo='';
  productosService:ProductosService=inject(ProductosService);
  productos:Productos[]=this.productosService.getProductos();
  nombre:string='';
  puja_actual:number=0;
  categorias:[]=[];
  fecha_fin:Date=new Date();
  fecha:string='';
  aumento:number=0;
  imagenes:[]=[];
  productoEncontrado:any;
  imagengrande:any;
  activo:boolean[]=[true];
  mostrarimagen:boolean=true;
  puja:number=0;
  error:string='';
  valido:boolean=false;
  puja_aumento:number=0;
  //datos de Alianza
  tipo:string='';
  marca:string='';
  modelo:string='';
  color:string='';
  anio:number=0;
  placa:string='';
  ngOnInit(){
    this.nombre=this.titulo;
    this.productoEncontrado = this.productos.find(producto => producto.titulo === this.nombre);
    this.puja_actual=this.productoEncontrado['puja_actual'];
    this.categorias=this.productoEncontrado['categorias'];
    this.fecha_fin=this.productoEncontrado['fecha_fin'];
    this.fecha=this.formatearFecha(this.fecha_fin);
    this.aumento=this.productoEncontrado['aumento'];
    this.imagenes=this.productoEncontrado['imagenes'];
    this.imagengrande=this.productoEncontrado['imagenes'][0];
    this.puja_aumento=this.puja_actual+this.aumento;
    this.puja=this.puja_aumento;
    this.tipo=this.productoEncontrado['tipo'];
    this.marca=this.productoEncontrado['marca'];
    this.modelo=this.productoEncontrado['modelo'];
    this.color=this.productoEncontrado['color'];
    this.anio=this.productoEncontrado['anio'];
    this.placa=this.productoEncontrado['placa'];
  }
  formatearFecha(fecha_fin:Date):string{
    const dia=fecha_fin.getDate();
    const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const mes=meses[fecha_fin.getMonth()];
    const anio= fecha_fin.getFullYear();
    let fecha_formateada=dia+' de '+mes+' del '+anio;
    return fecha_formateada;
  }
  cambiarImagen(index:number){
    this.activo.fill(false);
    this.imagengrande=this.imagenes[index];
    this.mostrarimagen=false;
    this.mostrarimagen=true;
    this.activo[index]=true;
  }
  enviarpuja(){
    if(!this.puja){
      this.valido=false;
      this.error='Ingrese un valor numérico';

    } else if(this.puja<(this.puja_aumento)){
      this.valido=false;
      this.error='La puja debe ser mayor o igual a '+this.puja_aumento;
    }else{
      this.valido=true;
      this.error='Puja enviada correctamente';
      console.log(this.puja);
    }
  }
}
