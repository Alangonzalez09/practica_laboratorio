import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { ModlaErrorComponent } from '../componentes/modla-error.component';
import { ModalController, LoadingController } from '@ionic/angular';
import { AutService } from '../service/aut.service';
import { Router } from '@angular/router';
import { MenuServiceService } from '../service/menu-service.service';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: User = new User();
  ionicForm: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private autSvc: AutService,
    private menuService: MenuServiceService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  async onLogin(){
    this.autSvc.onLogin(this.user).then((user:any)=>{
      if(user!=null && user.code ==undefined){
        console.log('Successfully logged in!');
        this.loadingController.dismiss();
        this.router.navigate(['/main/presupuesto']);
      }
      else{
        this.loadingController.dismiss();
        if(user.code){
          if(user.code=='auth/wrong-password' || user.code =='auth/invalid-email' || user.code=='auth/argument-error'){
            this.openModal(user);
          }
        }
      }
    }).catch((error: any)=>{
      this.openModal(error);
    })

  }

  async openModal(user: any){
    const modal = await this.modalCtrl.create({
      component: ModlaErrorComponent,
      componentProps:{
        error: 'Ingres password y/o contraseña'
      }
    });
    return await modal.present();
  }

  onRegister(){
    this.menuService.setTitle("register")
    this.router.navigate(['/register']);
  }
 
  buildForm(){
    this.ionicForm = this.formBuilder.group({
      email: new FormControl('',{validators: [Validators.email,Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)]})
    });
  }  

  hasError: any = (controlName: string, errorName: string) => {
    return !this.ionicForm.controls[controlName].valid &&
      this.ionicForm.controls[controlName].hasError(errorName) &&
      this.ionicForm.controls[controlName].touched;
  }   

  submitForm(){
    if(this.ionicForm.valid){
      this.user.email = this.ionicForm.get('email').value;
      this.user.password = this.ionicForm.get('password').value;
      this.presentLoadingWithOptions();
      this.onLogin();
    }
  }

  notZero(control: AbstractControl) {
    if (control.value && control.value <= 0) {
      return { 'notZero': true };
    }
    return null;
  } 

  ionViewWillEnter(){
    this.ionicForm.reset();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      //spinner: null,
      //duration: 6000,
      message: 'Iniciando sesion...',
      translucent: true,
      //cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }  
}
