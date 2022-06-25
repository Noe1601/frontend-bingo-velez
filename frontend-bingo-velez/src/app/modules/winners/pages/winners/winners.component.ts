import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaysService } from 'src/app/core/services/plays.service';
import { RemoveDuplicatedService } from 'src/app/core/services/remove-duplicated.service';
import { WinnersService } from 'src/app/core/services/winners.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: any;
  nameOfPlay: any;
  amountOfPlay: any;
  constructor(private _winnerService: WinnersService,
    private _router: Router,
    private _removeDuplicatedService: RemoveDuplicatedService) { }

  ngOnInit(): void {
    this.getWinners();
  }

  getWinners() {
    this._winnerService.getWinners().subscribe(data => {
      this.winners = this._removeDuplicatedService.transform(data.winners,'name');
    })
  }

  goToDetails(user: any) {
    this._router.navigateByUrl(`/pages/winner-detail/${user}`)
  }

}
