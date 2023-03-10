import { Injectable } from '@angular/core';
import {Receta} from '../interface/receta';
@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  recetas: Receta[]=[
    {
      id: 1,
      nombre: 'Pizza',
      image: 'https://www.dondeir.com/wp-content/uploads/2019/08/pizza-hut-cadenas-de-pizza-cdmx.jpg',
      ingredientes: ["queso", "salsa","peperoni", "harina","especies","sal"]
    },
    {
      id: 2,
      nombre: 'Chop suey de pollo',
      image: 'https://cdn7.kiwilimon.com/brightcove/6516/6516.jpg',
      ingredientes: ['2 cucharadas de aceite de ajonjoli',
    '1/2 cebolla fileteada',
  '1 diente de ajo picado finamente',
'400 gramos de pechuga de pollo cortada en cubos',
'1 Pimiento morron rojo cortado en bastones',
'1 Taza de brocoli cocido y cortado en ramilletes pequeños',
'1/2 Taza de apio cortado en medias lunas',
'2 Zanahorias cortadas en tiras',
'2 Tazas de germen de soya',
'1 Calabaza cortada en tiras',
'1 Cucharada de sal con ajo en polvo',
'5 Cucharadas de salsa de soya']
    },
    {
      id: 3,
      nombre: 'Pollo a la mexicana',
      image: 'https://assets.unileversolutions.com/recipes-v2/230090.jpg',
      ingredientes:[
        '1/2 Cebolla asada',
        '2 Dientes de ajo asados',
        '4 Jitomates asados',
        '1/2 Taza de agua',
        '2 Cubos de concentrado de tomate con pollo',
        '2 Cucharadas de aceite de maiz',
        '1/2 Cebolla fileteada',
        '5 muslos o piernas de pollo cocidos',
        '3 Jitomates cortados en cubos pequeños',
        '2 chiles jalapeño cortados en tiras',
        '2 ramitas de cilantro'
      ]
    },
    {
      id: 4,
      nombre: 'Paletas de fresa con chamoy',
      image: 'https://www.laylita.com/recetas/wp-content/uploads/Paletas-caseras-de-fresa-o-frutilla.jpg',
      ingredientes: [
        '2 Tazas de fresas congeladas',
        '1 1/2 Tazas de agua',
        '1/2 Tazas de azucar',
        '8 Vasos de plastico (4oz c/u)',
        '8 Vasos de plastico (1oz c/u)',
        '8 Palitos de madera para paleta',
        '1/2 Taza de concentrado de jamaica',
        '4 Cucharadas de chile con limon en polvo',
        '1 Cucharada de jugo Maggi',
        '1/4 Taza de chamoy liquido'
      ]
    }
  ];

  constructor() { }
  getReceta(idReceta: number){
    return{...this.recetas.find(
      (receta:Receta)=>{
        return receta.id===idReceta
      }
    )};
  }
  getRecetas(){
    return[...this.recetas];
  }
}
