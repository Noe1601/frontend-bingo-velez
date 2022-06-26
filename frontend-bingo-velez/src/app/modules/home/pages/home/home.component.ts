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
  randomNumber: number = 0;
  lastFiveNumbers: string = '';
  numbers: number[] = [];

  constructor(
    private _homeService: HomeService,
    private _playerService: PlayersService
  ) {}

  ngOnInit(): void {
    var cartonesQuantity = localStorage.getItem('CantidadDeCartones');
    this.items = this._homeService.items(
      cartonesQuantity ? Number(cartonesQuantity) : 30
    );

    this._playerService.getPlayers().subscribe((data) => {
      this.players = data.list;
    });

    localStorage.removeItem('RandomNumber');
  }

  resetCarton(carton: any) {
    var newCarton = this._homeService.newCarton(1);

    for (var key in newCarton) {
      var value = newCarton[key];
      value.index = carton.index;
      this.items[carton.index] = value;
    }
  }

  setColorToCellNumber() {
    this.randomNumber = this._homeService.getRandomInt(1, 75);
    this.lastFivePlays(this.randomNumber);
    localStorage.setItem('RandomNumber', String(this.randomNumber));
    const newItems = this._homeService.searchThroughCartonesToSetNumber(
      this.items
    );
    this.items = newItems;
  }

  lastFivePlays(play: number) {
    if (this.numbers.length == 5) {
      this.numbers.pop();
      this.numbers.unshift(play);
      this.numbers.join(' ');
      return;
    }
    this.numbers.unshift(play);
  }
}
