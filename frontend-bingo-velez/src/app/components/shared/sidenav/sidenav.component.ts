import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userID: any;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.userID = localStorage.getItem('id');
  }

  
  goToProfile(){
    this._router.navigateByUrl(`/pages/profile/${ this.userID }`);
  }


}
