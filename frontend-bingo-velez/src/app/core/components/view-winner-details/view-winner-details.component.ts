import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayWinnerService } from '../../services/play-winners.service';
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
  public notExistsWinners: string = '';
  public canShowNotificationToUser: boolean = false;

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor(private _winnerServide: WinnersService,
    private _playService: PlaysService,
    private _activatedRoute: ActivatedRoute,
    private _playWinnerService: PlayWinnerService) {
    this.params = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getDetailsByWinner();
  }

  getDetailsByWinner(){

    this._playWinnerService.getPlaysDetailsByPlayer(this.params).subscribe((detail: any) => {

      this._winnerServide.getWinner(this.params).subscribe(winner => {

        detail.details.forEach((d: any) => {

          this._playService.getPlay(d.jugada_id).subscribe(play => {
            this.details.push({       
              winnerName: winner.listById.name,
              playName: play.listById.name,
              amount: play.listById.monto,
              createdAt: winner.listById.createdAt
            })
    
          }, err => {
            throw new Error(err);
          });
        })


      }, err => {
        throw new Error(err);
      });

    })

  }

  searchByDates(){
    const { start, end } = this.range.value;

    this.details.filter((detail, index) => {

      if(new Date(detail.createdAt) >= start && new Date(detail.createdAt) <= end){
        this.details.push(detail);
        this.canShowNotificationToUser = false;
      }else{
        this.canShowNotificationToUser = true;
        this.notExistsWinners = 'Este jugador no gano en este rango de fecha.'
      }

    })
  }

}
