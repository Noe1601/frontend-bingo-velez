import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaysService } from 'src/app/core/services/plays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-plays',
  templateUrl: './update-plays.component.html',
  styleUrls: ['./update-plays.component.scss']
})
export class UpdatePlaysComponent implements OnInit {

  updatePlaysForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _playService: PlaysService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _dialog: MatDialog) { 

                this.updatePlaysForm = this._fb.group({
                  name: [data.name, Validators.required],
                  monto: [data.monto, Validators.required]
                })

              }

  ngOnInit(): void {
  }

  updatePlay(){
    this._playService.updatePlay(this.data.id, this.updatePlaysForm.value).subscribe(data => {
      Swal.fire('Jugada actualizada', 'Se actualizo la jugada correctamente.', 'success');
      this._dialog.closeAll();
    }, err => {
      Swal.fire('Error', 'Hubo un error en la actualizacion de la jugada.', 'error');
    })
  }

}
