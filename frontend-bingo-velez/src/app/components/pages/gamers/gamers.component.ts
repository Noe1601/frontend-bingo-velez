import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayersService } from 'src/app/services/players.service';
import Swal from 'sweetalert2';
import { CreatePlayerComponent } from '../create-player/create-player.component';
import { UpdatePlayerComponent } from '../update-player/update-player.component';

@Component({
  selector: 'app-gamers',
  templateUrl: './gamers.component.html',
  styleUrls: ['./gamers.component.scss']
})
export class GamersComponent implements OnInit {

  players: any;

  constructor(private _playerService: PlayersService,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(){
    this._playerService.getPlayers().subscribe(players => {
      this.players = players.list;
    })
  }

  deletePlayer(player: any){
    this._playerService.deletePlayer(player.id).subscribe(player => {
      Swal.fire('Desactivando jugador', 'Jugador desactivado', 'success');
      this.getPlayers();
    }, err => {
      Swal.fire('Error', 'Ocurrio un error', 'error');
    })
  }

  openUpdatePlayerDialog(player: any){
    this._dialog.open(UpdatePlayerComponent, {
      width: '500px',
      data: player
    });
  }

  openCreatePlayerDialog(){
    this._dialog.open(CreatePlayerComponent, {
      width: '500px'
    })
  }

}
