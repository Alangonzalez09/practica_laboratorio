import { Component, OnInit, OnDestroy } from '@angular/core';
import { Menu } from 'src/app/interface/menu';
import { Router } from '@angular/router';
import { AutService } from '../service/aut.service'; 
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { Subscription } from 'rxjs';
import { onAuthStateChanged } from '@firebase/auth';

@Component({
  selector: 'app-float-menu',
  templateUrl: './float-menu.component.html',
  styleUrls: ['./float-menu.component.scss'],
})
export class FloatMenuComponent implements OnInit, OnDestroy {

  titleMenu: string='home';

  public isLoged : any = false;

  public subscription : Subscription = new Subscription();

  datosMenu: Menu[] =[
    {nombre: 'login',enlace:'/login',
    icono:'log-in-outline'},
    {nombre: 'logout',enlace:'/home',
    icono:'log-out-outline'}
  ];
  constructor(
    private autService: AutService,
    private menuService: MenuServiceService,
    private router: Router
  ) { 
    onAuthStateChanged(this.autService.getStateAuth(), user=>{
      if(user!=null && user != undefined){
        this.isLoged = true;
      }
    });

  this.subscription = this.menuService.$getTitleMenu.subscribe(data=>{
    console.log(data);
    this.titleMenu =data;
  });

}

  ngOnInit() {}

  navegar(link: string, titleMenu: string){
    this.titleMenu =titleMenu;
    this.router.navigate([link]);
  }

  ngOnDestroy(): void {
    if(this.subscription != null || this.subscription!= undefined){
      this.subscription.unsubscribe();
    }
  }

  onMenuOpen(){
    onAuthStateChanged(this.autService.getStateAuth(), user=>{
      if(user!=null && user != undefined){
        this.datosMenu =[
          {nombre: 'Alumnos',enlace:'/alumno',
    icono:'school-outline'},
      {nombre: 'Recetas',enlace:'/receta',
      icono:'restaurant-outline'},
      {nombre: 'inicio',enlace:'/inicio',
      icono:'navigate-outline'},
      {nombre: 'Turismo',enlace:'/destinos',
      icono:'airplane'},
      {nombre: 'Tabs',enlace:'/tabs',
      icono:'folder-outline'},
      {nombre: 'login',enlace:'/login',
      icono:'log-in-outline'},
          {nombre: 'logout',enlace:'/home',
          icono:'log-out-outline'}
        ];
      }      
     else{
        this.datosMenu =[
          {nombre: 'login',enlace:'/login',
          icono:'log-in-outline'},
          {nombre: 'logout',enlace:'/home',
          icono:'log-out-outline'}
        ];
      }
    });
  }
}