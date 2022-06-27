import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { HomeService } from '../../services/home.service';
import { ValidateRoleService } from '../../services/validation-user-role.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userID: any;
  isAdmin: boolean = false;
  priceSelected: any;
  prices: any[] = [];
  randomNumber: number = 0;

  constructor(private _router: Router,
    private _sharedService: SharedService,
    private _validateRoleService: ValidateRoleService,
    private _homeService: HomeService) {
    this.prices = [15, 20, 30];
  }

  changePrice(price: any) {
   this._sharedService.setLocalStorage('price', price);
  }

  ngOnInit(): void {
    this.isAdmin = this._validateRoleService.validationRole;
    this.userID = localStorage.getItem('id');
  }


  goToProfile() {
    this._router.navigateByUrl(`/pages/profile/${this.userID}`);
  }

  logOut() {
    this._sharedService.removeItemFromLocalStorage('role');
    this._sharedService.removeItemFromLocalStorage('user');
    this._sharedService.removeItemFromLocalStorage('token');
    this._sharedService.removeItemFromLocalStorage('id');
  }

  // generateRandomNumber(){
  //   this.randomNumber = this._homeService.getRandomInt(1,75);
  //   localStorage.setItem('RandomNumber', String(this.randomNumber));
  // }

}
