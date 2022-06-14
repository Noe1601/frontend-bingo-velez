import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayersService } from 'src/app/services/players.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.scss']
})
export class UpdatePlayerComponent implements OnInit {

  updatePlayerForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private _playerService: PlayersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialog) {

    this.updatePlayerForm = this._fb.group({
      name: [data.name, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  updatePlayer(){
    this._playerService.updatePlayer(this.data.id, this.updatePlayerForm.value).subscribe(data => {
      Swal.fire('Jugador actualizado', 'Se actualizo el jugador correctamente.', 'success');
      this._dialog.closeAll();
    }, err => {
      Swal.fire('Error', 'Hubo un error en la actualizacion del jugador.', 'error');
    })
  }

}
