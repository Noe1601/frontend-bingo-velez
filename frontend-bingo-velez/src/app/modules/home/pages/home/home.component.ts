import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import { PlayersService } from 'src/app/core/services/players.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  items: any;
  players: any;
  firstRow: any[] = [];
  secondRow: any[] = [];
  thirdRow: any[] = [];
  fourthRow: any[] = [];
  fifthRow: any[] = [];

  constructor(private _homeService: HomeService,
    private _playerService: PlayersService) {}

  ngOnInit(): void {
    var cartonesQuantity = localStorage.getItem("CantidadDeCartones");
    this.items = this._homeService.items(cartonesQuantity ? Number(cartonesQuantity) : 30);

    this._playerService.getPlayers().subscribe(data => {
      this.players = data.list;
    })
  }

  resetCarton(carton: any){
    var nuevoCarton = this._homeService.nuevoCarton(1);

    for(var key in nuevoCarton) {
      var value = nuevoCarton[key];
      value.index = carton.index;
      this.items[carton.index] = value;
    }
  }

}
