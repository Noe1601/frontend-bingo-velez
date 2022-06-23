import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlaysService } from '../../services/plays.service';
import { WinnersService } from '../../services/winners.service';

@Component({
  selector: 'app-view-winner-details',
  templateUrl: './view-winner-details.component.html',
  styleUrls: ['./view-winner-details.component.scss']
})
export class ViewWinnerDetailsComponent implements OnInit {

  public params: any;
  public details: any[] = [];

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor(private _winnerServide: WinnersService,
    private _playService: PlaysService,
    private _activatedRoute: ActivatedRoute) {
    this.params = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDetailsByWinner();
  }

  getDetailsByWinner(){
    this._winnerServide.getWinner(this.params).subscribe(winner => {
      this._playService.getPlay(winner.listById.jugada_id).subscribe(play => {
        this.details.push({
          
          winnerName: winner.listById.name,
          playName: play.listById.name,
          amount: play.listById.monto,
          createdAt: winner.listById.createdAt
        })

      }, err => {
        throw new Error(err);
      });
    }, err => {
      throw new Error(err);
    });
  }

}
