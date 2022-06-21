import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaysService } from 'src/app/core/services/plays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-play',
  templateUrl: './create-play.component.html',
  styleUrls: ['./create-play.component.scss']
})
export class CreatePlayComponent implements OnInit {

  createPlaysForm: FormGroup;

  constructor(private _fb: FormBuilder,
            private _playService: PlaysService,
            private _dialog: MatDialog) { 

    this.createPlaysForm = this._fb.group({
      name: ['', Validators.required],
      monto: ['', Validators.required],
      state: [true, Validators.required]
    });

  }

  ngOnInit(): void {
  }

  createPlay(){
    if(this.createPlaysForm.valid){
      this._playService.createPlay(this.createPlaysForm.value).subscribe(createdPlay => {
        Swal.fire('Jugada creada', 'Se creo la jugada correctamente', 'success');
        this._dialog.closeAll();
      }, err => {
        Swal.fire('Error', 'Ocurrio un error en la creacion de la jugada', 'error');
      })
    }
  }

}
