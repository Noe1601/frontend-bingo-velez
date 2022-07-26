import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlaysService } from 'src/app/core/services/plays.service';
import { ValidateRoleService } from 'src/app/core/services/validation-user-role.service';
import Swal from 'sweetalert2';
import { CreatePlayComponent } from '../../../../core/components/create-play/create-play.component';
import { UpdatePlaysComponent } from '../../../../core/components/update-plays/update-plays.component';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.scss']
})
export class PlaysComponent implements OnInit {

  plays: any;
  isAdmin: boolean = false;

  constructor(private _playService: PlaysService,
    private _dialog: MatDialog,
    private _router: Router,
    private _validateRoleService: ValidateRoleService) { }

  ngOnInit(): void {
    this.isAdmin = this._validateRoleService.validationRole;
    this.getPlays();
  }

  getPlays() {
    this._playService.getPlays().subscribe(plays => {
      this.plays = plays.list;
    })
  }

  deletePlay(play: any) {
    this._playService.deletePlay(play.id).subscribe(playDeleted => {
      Swal.fire('Desactivando jugada', 'Se desactivo esta jugada satisfactoriamente', 'success');
      this.getPlays();
    }, err => {
      Swal.fire('Error', 'Ocurrio un error desactivando esta jugada.', 'error');
    })
  }

  openUpdatePlayDialog(play: any) {
    this._dialog.open(UpdatePlaysComponent, {
      width: '500px',
      data: play
    });
  }

  openCreatePlayDialog() {
    this._dialog.open(CreatePlayComponent, {
      width: '500px'
    })
  }

  goToPlaysInactives() {
    this._router.navigateByUrl('/pages/desactivatedPlays');
  }
}
