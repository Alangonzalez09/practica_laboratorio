import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PresupuestoPage } from './presupuesto.page';
import { PresupuestoPageRoutingModule } from './presupuesto-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PresupuestoPageRoutingModule
  ],
  declarations: [PresupuestoPage]
})
export class PresupuestoPageModule {}
