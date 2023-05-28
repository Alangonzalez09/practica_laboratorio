export class Lugar {

    nombre: string;

    id?: string; // id de firebase no corresponde a mi modelo
    
    latitud: number = 0;

    longitud: number = 0;
    
    ubicacion?: any = {latitud:'', longitud:''};

    constructor(){

        this.nombre='';

    }

    public setUbicacion(latitud: string, Longiutd: string){

        this.ubicacion.latitud= latitud;

        this.ubicacion.longitud = Longiutd;

    }
}
