import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaysService } from 'src/app/core/services/plays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plays-desactivated',
  templateUrl: './plays-desactivated.component.html',
  styleUrls: ['./plays-desactivated.component.scss']
})
export class PlaysDesactivatedComponent implements OnInit {

  plays: any;

  constructor(private _playService: PlaysService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getDesactivatedPlays();
  }

  getDesactivatedPlays(){
    this._playService.getDesactivatedPlays().subscribe(plays => {
      this.plays = plays.list;
    })
  }

  goToPlaysActive(){
    this._router.navigateByUrl('/pages/plays');
  }

  activatePlay(play: any){
    this._playService.updatePlay(play.id, { state: true }).subscribe(data => {
      Swal.fire('Activando jugadas','Jugada activada correctamente.','success');
      this.getDesactivatedPlays();
    }, err => {
      Swal.fire('Error','Ocurrio un error activando esta jugada.','error');
    })
  }
}
