export class Lugar {
    nombre: string;

    ubicacion?: any = {latitud:'', longitud:''};

    constructor(){

        this.nombre='';

    }

    public setUbicacion(latitud: string, Longiutd: string){

        this.ubicacion.latitud= latitud;

        this.ubicacion.longitud = Longiutd;

    }
}