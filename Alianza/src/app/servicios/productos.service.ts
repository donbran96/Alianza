import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos:Productos[]=[
    {
      imagenes: ['https://img.freepik.com/fotos-premium/cadaver-coche-estrellado-seguro-automovil_99974-652.jpg', 'https://siempreauto.com/wp-content/uploads/sites/9/2021/10/Auto-chocado.jpg', 'https://c8.alamy.com/compes/kr4jfd/diciembre-de-2017-el-arbol-1-0-coches-coche-viejo-verde-danado-cuando-se-topo-con-un-arbol-kr4jfd.jpg'],
      titulo: 'Producto 1',
      puja_actual: 3000,
      categorias: ['Subastas', 'Vehículos'],
      fecha_fin: new Date('2023-12-31T23:59:59'),
      aumento: 10
    },
    {
      imagenes: ['https://img.freepik.com/fotos-premium/cadaver-coche-estrellado-seguro-automovil_99974-652.jpg', 'https://siempreauto.com/wp-content/uploads/sites/9/2021/10/Auto-chocado.jpg', 'https://c8.alamy.com/compes/kr4jfd/diciembre-de-2017-el-arbol-1-0-coches-coche-viejo-verde-danado-cuando-se-topo-con-un-arbol-kr4jfd.jpg'],
      titulo: 'Producto 2',
      puja_actual: 2500,
      categorias: ['Subastas', 'Vehículos'],
      fecha_fin: new Date('2023-12-31T23:59:59'),
      aumento: 10
    },
    {
      imagenes: ['https://img.freepik.com/fotos-premium/cadaver-coche-estrellado-seguro-automovil_99974-652.jpg', 'https://siempreauto.com/wp-content/uploads/sites/9/2021/10/Auto-chocado.jpg', 'https://c8.alamy.com/compes/kr4jfd/diciembre-de-2017-el-arbol-1-0-coches-coche-viejo-verde-danado-cuando-se-topo-con-un-arbol-kr4jfd.jpg'],
      titulo: 'Producto 3',
      puja_actual: 2800,
      categorias: ['Subastas', 'Vehículos'],
      fecha_fin: new Date('2023-12-31T23:59:59'),
      aumento: 10
    },
    {
      imagenes: ['https://img.freepik.com/fotos-premium/cadaver-coche-estrellado-seguro-automovil_99974-652.jpg', 'https://siempreauto.com/wp-content/uploads/sites/9/2021/10/Auto-chocado.jpg', 'https://c8.alamy.com/compes/kr4jfd/diciembre-de-2017-el-arbol-1-0-coches-coche-viejo-verde-danado-cuando-se-topo-con-un-arbol-kr4jfd.jpg'],
      titulo: 'Producto 4',
      puja_actual: 3700,
      categorias: ['Subastas', 'Vehículos'],
      fecha_fin: new Date('2023-12-31T23:59:59'),
      aumento: 10
    },
    {
      imagenes: ['https://img.freepik.com/fotos-premium/cadaver-coche-estrellado-seguro-automovil_99974-652.jpg', 'https://siempreauto.com/wp-content/uploads/sites/9/2021/10/Auto-chocado.jpg', 'https://c8.alamy.com/compes/kr4jfd/diciembre-de-2017-el-arbol-1-0-coches-coche-viejo-verde-danado-cuando-se-topo-con-un-arbol-kr4jfd.jpg'],
      titulo: 'Producto 5',
      puja_actual: 4000,
      categorias: ['Subastas', 'Vehículos'],
      fecha_fin: new Date('2023-12-31T23:59:59'),
      aumento: 10
    },
    {
      imagenes: ['https://img.freepik.com/fotos-premium/cadaver-coche-estrellado-seguro-automovil_99974-652.jpg', 'https://siempreauto.com/wp-content/uploads/sites/9/2021/10/Auto-chocado.jpg', 'https://c8.alamy.com/compes/kr4jfd/diciembre-de-2017-el-arbol-1-0-coches-coche-viejo-verde-danado-cuando-se-topo-con-un-arbol-kr4jfd.jpg'],
      titulo: 'Producto 6',
      puja_actual: 1500,
      categorias: ['Subastas', 'Vehículos'],
      fecha_fin: new Date('2023-12-31T23:59:59'),
      aumento: 10
    }
  ];
  constructor() { }
  getProductos():Productos[]{
    return this.productos;
  }
}
