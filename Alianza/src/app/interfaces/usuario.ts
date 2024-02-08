export interface Usuario {
    id:string;
    name:string;
    surname: string;
    ci:number;
    mail:string;
    phone:number;
    url_img_1: string;
    url_img_2: string;
    verify: number;
    subastas: number[];
}
