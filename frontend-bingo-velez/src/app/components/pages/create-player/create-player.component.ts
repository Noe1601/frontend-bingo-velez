import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlayersService } from 'src/app/services/players.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {

  createPlayerForm: FormGroup;

  constructor(private _fb: FormBuilder,
            private _playerService: PlayersService,
            private _dialog: MatDialog) { 

    this.createPlayerForm = this._fb.group({
      name: ['', Validators.required],
      state: [true, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  createPlayer(){
    if(this.createPlayerForm.valid){
      this._playerService.createPlayer(this.createPlayerForm.value).subscribe(createdPlay => {
        Swal.fire('Jugador creado', 'Se creo jugador correctamente', 'success');
        this._dialog.closeAll();
      }, err => {
        Swal.fire('Error', 'Ocurrio un error en la creacion de jugador', 'error');
      })
    }
  }

}
