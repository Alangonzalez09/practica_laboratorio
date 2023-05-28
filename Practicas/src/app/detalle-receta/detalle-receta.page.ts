import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from '../interface/receta';
import { RecetaService } from '../service/receta.service';


@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.page.html',
  styleUrls: ['./detalle-receta.page.scss'],
})
export class DetalleRecetaPage implements OnInit {

  idReceta: number = 0;
  receta: any;


  constructor(
    private recetaService: RecetaService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRouter.paramMap.subscribe((paramMap: any)=>{
      this.idReceta = Number.parseInt(paramMap.get('idReceta'));
      this.receta = this.recetaService.getReceta(this.idReceta);
    });
  }

}
