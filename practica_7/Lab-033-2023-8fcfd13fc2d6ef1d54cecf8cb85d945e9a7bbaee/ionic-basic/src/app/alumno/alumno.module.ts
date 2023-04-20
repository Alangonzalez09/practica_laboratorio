import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatosAlumnoComponent } from '../datos-alumno/datos-alumno.component';
import { AlumnosPage } from './alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPageModule
  ],
  declarations: [AlumnosPage,DatosAlumnoComponent]
})
export class AlumnoPageModule {}
