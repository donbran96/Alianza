import { DecimalPipe } from "@angular/common";

export interface Productos {

    id:number;
    nombre_comercial: string;
    nombre_completo: string;
    observacion: string;
    images: string[];
    precio_base: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    categoria: string;
    incremento_puja: number;
    estado: number;

    /*id:number;
    imagenes: string[];
    titulo: string;
    puja_actual: number;
    categoria: string;
    fecha_fin: Date;
    aumento: number;
    costo_inicial: DecimalPipe;
    //a partir de acá abajo son los campos que  solicitaron los de Alianza
    tipo: string;
    marca: string;
    modelo: string;
    color: string;
    anio: number;
    placa: string;
    */
}

