import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuth: boolean = true;

  constructor(private _sharedService: SharedService,
              private _router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
      setTimeout(() => {
      const token = this._sharedService.getLocalStorage('token');

      if(token != null){
        this.isAuth = false;
      }else{
        this.isAuth = false;
        this._router.navigateByUrl('/auth/login')
      }

      }, 5000)

      return this.isAuth;

  }
  
}
