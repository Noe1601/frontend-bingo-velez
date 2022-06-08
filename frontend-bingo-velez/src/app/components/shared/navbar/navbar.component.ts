import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toogle: EventEmitter<any> = new EventEmitter();

  menu: any;
  showMenu = false;
  userName: any;
  userID: any;

  constructor(private _router: Router,
              private _sharedService: SharedService) { }

  ngOnInit(): void {
    this.Toogle();
    this.userName = localStorage.getItem('user');
    this.userID = localStorage.getItem('id');
  }

  Toogle() {
    this.toogle.emit();
  }

  Logout() {
    this._sharedService.removeItemFromLocalStorage('token');
    this._sharedService.removeItemFromLocalStorage('user');
    this._router.navigateByUrl('/login');
  }

  goToProfile(){
    this._router.navigateByUrl(`/pages/profile/${ this.userID }`);
  }

}
