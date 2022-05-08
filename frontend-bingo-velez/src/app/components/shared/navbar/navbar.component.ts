import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    this.Toogle();
  }

  Toogle() {
    this.toogle.emit();
  }

  Logout() {
    this._router.navigateByUrl('/login');
  }

}
