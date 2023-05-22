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
  estado: string ="Alta destino";
  editando: boolean= false;

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
      if(!this.editando){
        this.authService.altaLugar(this.lugar).then((e:any)=>{
          this.ionicForm.reset();
          this.authService.getLugares(this.destinos);
        }).catch(e=>{
          console.error(e);
        });        
      } else{
        this.authService.updateLugares(this.lugar.id, this.lugar).then(e=>{
          this.editando= false;
          this.estado = "Alta destino";
          this.lugar = new Lugar();
          this.ionicForm.reset();
          this.authService.getLugares(this.destinos);
        }).catch(e=>{
          console.error(e);
        });
      }
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

  editarLugar(id: any, lugar: any) {
    this.editando = true;
    this.lugar = lugar;
    this.estado = "Editar el lugar";
    this.ionicForm.get('nombre').setValue(lugar.nombre);
  }

  eliminarLugar(id: any) {
    this.estado = "Alta destino";
    this.editando = false;
    this.ionicForm.reset();
    this.authService.deleteLugar(id).then(response=>{
      this.authService.getLugares(this.destinos);     
    }).catch(error=>{});

  }

  cancelarEdicion(){
    this.estado = "Alta destino";
    this.editando = false;
    this.ionicForm.reset();
    this.lugar = new Lugar();
  } 
}
