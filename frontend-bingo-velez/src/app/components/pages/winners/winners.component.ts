import { Component, OnInit } from '@angular/core';
import { PlaysService } from 'src/app/services/plays.service';
import { WinnersService } from 'src/app/services/winners.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: any;
  nameOfPlay: any;
  amountOfPlay: any;
  constructor(private _winnerService: WinnersService) { }

  ngOnInit(): void {
    this.getWinners();
  }

  getWinners(){
    this._winnerService.getWinners().subscribe(data => {
      this.winners = data.winners;
    })
  }

}
