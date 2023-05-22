import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lugar } from '../interface/lugar';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-destinos-api',
  templateUrl: './destinos-api.page.html',
  styleUrls: ['./destinos-api.page.scss'],
})
export class DestinosApiPage implements OnInit {

  lugar: Lugar = new Lugar();
  destinos: any[] = [];
  ionicForm: any;
  estado: string ="Alta destino";
  editando: boolean= false;
  latitud: any;
  longitud: any;

  constructor(
    private lugarService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getPosition();
  }

  getLugares(){
    this.lugarService.getLugaresApi().subscribe((response: Lugar[])=>{
      this.destinos = response;
    }, error=>{
      console.error(error);
    });
  }

  submitForm(){

    //this.lugar = (this.lugar == undefined ? new Lugar() : this.lugar); 
    
    if(this.ionicForm.valid){
      this.lugar.nombre = this.ionicForm.get('nombre').value;
      this.lugar.latitud = this.latitud;
      this.lugar.longitud = this.longitud;
      if(!this.editando){
        this.lugarService.altaLugarApi(this.lugar).subscribe((response: any)=>{
          if(response){
            this.ionicForm.reset();
            this.getLugares();
          } else{
            this.errorProceso();
          }
        }, error=>{
          console.error(error);
        })      
      } else{
        this.lugarService.editarLugarApi(this.lugar.id, this.lugar).subscribe((resposne: any)=>{
          if(resposne){
            this.editando= false;
            this.estado = "Alta destino";
            this.lugar = new Lugar();
            this.ionicForm.reset();
            this.getLugares();
          } else{
            this.errorProceso();
          }
        }, error=>{
          console.error(error);
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
    this.lugarService.borrarLugarApi(id).subscribe((response:any)=>{
      if(response){
        this.getLugares();
        this.estado = "Alta destino";
        this.editando = false;
        this.ionicForm.reset();
      } else{
        this.errorProceso();
      }
    }, error=>{
      console.error(error);
    })
  }

 // cada que se vuelve a entrar a la pagina ó componente de pagina
  //https://ionicframework.com/docs/angular/lifecycle
  ionViewWillEnter(){
    this.getLugares();
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

  errorProceso(){
    alert("Ocurrio un error en el proceso");
  }

}
