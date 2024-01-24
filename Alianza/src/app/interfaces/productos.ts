export interface Productos {
    id:number;
    imagenes: string[];
    titulo: string;
    puja_actual: number;
    categorias: string[];
    fecha_fin: Date;
    aumento: number;
    //a partir de acá abajo son los campos que  solicitaron los de Alianza
    tipo: string;
    marca: string;
    modelo: string;
    color: string;
    anio: number;
    placa: string;
}

