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
  latitud: any;
  longitud: any;

  constructor(
    private authService: AutService,
    private formBuilder: FormBuilder
    ) { 

    }

  ngOnInit() {
    this.buildForm();
    this.authService.getLugares(this.destinos);
    this.getPosition();
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
      this.lugar.latitud = this.latitud;
      this.lugar.longitud = this.longitud;
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

  getPosition(): Promise<any> {
		return new Promise((resolve: any, reject: any): any => {
			navigator.geolocation.getCurrentPosition((resp: any) => {
				this.latitud = resp.coords.latitude;
				this.longitud = resp.coords.longitude;
			},
			(err: any) => {
				if ( err.code === 1 ) {
					alert('Favor de activar la geolocalización en tu navegador y recargar la pantalla.');
				}
				this.latitud = null;
				this.longitud = null;
			}, {timeout: 5000, enableHighAccuracy: true });
		});
	}  
}
