import { Component } from '@angular/core';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { AutService } from '../service/aut.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoged : any = false;
  constructor(
    private authService: AutService,
    private router: Router
    ) {
      onAuthStateChanged(this.authService.getStateAuth(), user=>{
        if(user!=null && user != undefined){
          this.isLoged = true;
        }
      });
    }

    onLogout(){
      signOut(this.authService.getStateAuth()).then(response=>{
        console.log("Logout!");
        this.router.navigateByUrl('/login');
      }).catch(error=>{

      });
    }
}
