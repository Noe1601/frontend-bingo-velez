import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Sign: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sign(){
    this.Sign = !this.Sign;
  }
}