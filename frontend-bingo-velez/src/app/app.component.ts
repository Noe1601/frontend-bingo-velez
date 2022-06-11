import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public actualRoute: string = '';
  public canMenuVisible: boolean = true;

  constructor(private location: Location){
    this.actualRoute = this.location.path();

    if(this.actualRoute === '/login' || this.actualRoute === '/register'){
      this.canMenuVisible = false
    }else{
      this.canMenuVisible = true;
    }
    
  }
}
