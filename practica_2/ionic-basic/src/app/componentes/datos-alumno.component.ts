import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Alumno} from '../interface/alumno'
@Component({
  selector: 'app-datos-alumno',
  templateUrl: './datos-alumno.component.html',
  styleUrls: ['./datos-alumno.component.scss'],
})
export class DatosAlumnoComponent implements OnInit {
  @Input() alumnosList:Alumno[] = [];
  @Output() eliminar: any = new EventEmitter<Alumno[]>();
  @Output() editar: any = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

}
