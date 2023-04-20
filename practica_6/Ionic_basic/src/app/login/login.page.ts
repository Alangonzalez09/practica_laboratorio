import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { ModalErrorComponent } from '../componentes/modal-error.component';
import { ModalController } from '@ionic/angular';
import { AutService } from '../service/aut.service';
import { Router } from '@angular/router';
import { MenuServiceService } from '../service/menu-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private autSvc: AutService,
    private menuService: MenuServiceService
  ) { }

  ngOnInit() {
  }

  async onLogin(){
    this.autSvc.onLogin(this.user).then((user:any)=>{
      if(user!=null && user.code ==undefined){
        console.log('Successfully logged in!');
        this.router.navigate(['/presupuesto']);
      }
      else{
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
      component: ModalErrorComponent,
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
}
