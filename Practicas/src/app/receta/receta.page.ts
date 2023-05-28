import { Component, OnInit } from '@angular/core';
import { Receta } from '../../../ionic-basic/src/app/receta';
import { RecetaService } from '../../../ionic-basic/src/app/service/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {

  recetas: Receta[] = [] ;

  constructor(private recetaService: RecetaService) { }

  ngOnInit() {
    this.recetas = this.recetaService.getRecetas();
  }

}
