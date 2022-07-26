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

      if(localStorage.getItem('token') != null){
        this.isAuth = true;
      }else{
        this.isAuth = false;
        this._router.navigateByUrl('/login')
      }

      }, 800)

      return this.isAuth;

  }
  
}
