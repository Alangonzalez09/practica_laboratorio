import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'alumnos',
        loadChildren : () => import('../alumnos/alumnos.module').then(m=>m.AlumnosPageModule)
      }
      ,
      {
        path: 'recetas',
        loadChildren: () => import('../receta/receta.module').then(m=>m.RecetaPageModule)
      },
      {
        path: 'galeria',
        loadChildren: () => import('../galeria/galeria.module').then(m=>m.GaleriaPageModule)
      },
      {
        path:'',
        redirectTo: '/main/tabs/alumnos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/tabs/alumnos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
