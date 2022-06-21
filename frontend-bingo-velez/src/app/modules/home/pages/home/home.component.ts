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

  constructor(private _homeService: HomeService,
    private _playerService: PlayersService) {}

  ngOnInit(): void {
    this.items = this._homeService.items();
    this._playerService.getPlayers().subscribe(data => {
      this.players = data.list;
    })
  }


}
