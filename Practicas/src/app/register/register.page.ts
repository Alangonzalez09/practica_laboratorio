import { Component, OnInit } from '@angular/core';
import { AutService } from '../service/aut.service';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { MenuServiceService } from '../service/menu-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = new User();

  constructor(
    private autSvc: AutService,
    private router: Router,
    private menuService: MenuServiceService
  ) { }

  ngOnInit() {
  }

  async onRegister(){
    this.autSvc.onRegister(this.user).then(user=>{
      if(user){
        console.log('Successfully created user!');
        this.router.navigate(['/login']);
      }
    }).catch(error=>{
      console.log('Error al crear usuario!');
    })

  } 
  onLogin(){
    this.menuService.setTitle("login");
    this.router.navigate(["/login"]);
  }
}
