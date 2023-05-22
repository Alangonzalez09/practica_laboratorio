import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutService } from './aut.service';

@Injectable({
  providedIn: 'root'
})
export class AutGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoged){
        return true;
      }
      else{
        console.log("Acceso denegado!");
        this.router.navigate(['/login']);
        return false;
      }
  }
  
  constructor(
    private authService: AutService,
    private router: Router
  ){

  }
}
