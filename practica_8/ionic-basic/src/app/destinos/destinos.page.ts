import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lugar } from '../interface/lugar';
import { AutService } from '../service/aut.service';
@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.page.html',
  styleUrls: ['./destinos.page.scss'],
})
export class DestinosPage implements OnInit {

  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  ionicForm: any;

  constructor(
    private authService: AutService,
    private formBuilder: FormBuilder
    ) { 

    }

  ngOnInit() {
    this.buildForm();
    this.authService.getLugares(this.destinos);
  }

  // cada que se vuelve a entrar a la pagina ó componente de pagina
  //https://ionicframework.com/docs/angular/lifecycle

  ionViewWillEnter(){
    this.authService.getLugares(this.destinos);
  }


  altaLugar(){
    this.authService.altaLugar(this.lugar);
    this.authService.getLugares(this.destinos);
    this.ionicForm.reset();
  }

  submitForm(){
    if(this.ionicForm.valid){
      this.lugar.nombre = this.ionicForm.get('nombre').value;
      this.altaLugar();
    }
  }

  buildForm(){
    this.ionicForm = this.formBuilder.group({
      nombre: new FormControl('',{validators: [Validators.required]})
    });
  }  

  hasError: any = (controlName: string, errorName: string) => {
    return !this.ionicForm.controls[controlName].valid &&
      this.ionicForm.controls[controlName].hasError(errorName) &&
      this.ionicForm.controls[controlName].touched;
  }  
}
