import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userID: any;

  constructor(private _router: Router,
              private _sharedService: SharedService) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('id');
  }

  
  goToProfile(){
    this._router.navigateByUrl(`/pages/profile/${ this.userID }`);
  }

  logOut(){
    this._sharedService.removeItemFromLocalStorage('role');
    this._sharedService.removeItemFromLocalStorage('user');
    this._sharedService.removeItemFromLocalStorage('token');
    this._sharedService.removeItemFromLocalStorage('id');
  }

}
