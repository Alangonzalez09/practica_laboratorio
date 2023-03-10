import { Component, OnInit } from '@angular/core';
import {Menu} from 'src/app/interface/menu';
import {Router} from '@angular/router';
@Component({
  selector: 'app-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['./float-menu.component.scss'],
})
export class FloatMenuComponent implements OnInit {
  datosMenu: Menu[]=[
    {nombre: 'home',enlace:'/home',icono:'home-outline'},
    {nombre: 'Alumnos',enlace:'/alumnos',icono:'school-outline'},
    {nombre: 'Recetas',enlace:'/receta',icono:'restaurant-outline'},
    {nombre: 'Presupuesto',enlace:'/presupuesto',icono:'cash-outline'},
    {nombre:'inicio',enlace:'/inicio',icono:'navigate-outline'},
    {nombre:'Tabs',enlace:'/tabs',icono:'folder-outline'}

  ];

  constructor(private router: Router) { }

  ngOnInit() {}
  navegar(link: string){
    this.router.navigate([link]);
  }

}
