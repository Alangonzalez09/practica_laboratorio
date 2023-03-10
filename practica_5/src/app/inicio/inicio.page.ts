import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Personaje} from '../interface/personaje';
import {EnvioReceptorService} from '../service/envio-receptor.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  user: Personaje = {name:'Diego Canela', uuid: "19207692002", email:"diegog@mail.com"};
  list: Personaje[]=
  [
    {name:'Diego Canela', uuid: "19207692002", email:"diegog@mail.com"},
    {name:'Diego Canela', uuid: "19207692002", email:"diegog@mail.com"},
    {name:'Diego Canela', uuid: "19207692002", email:"diegog@mail.com"},
  ];
  constructor(
    private router: Router,
    private envioReceptor: EnvioReceptorService) { }

  ngOnInit() {
  }
  redireccionReceptor(){
    this.envioReceptor.sendObjectSource(this.user);
    this.envioReceptor.sendListSource(this.list);
    this.router.navigate(['/receptor']);
  }
}
