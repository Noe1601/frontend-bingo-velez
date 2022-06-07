import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _userService: UsersService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _dialog: MatDialog) {

    this.updateUserForm = this._fb.group({
      NAME: [data.NAME, Validators.required],
      EMAIL: [data.EMAIL, Validators.required],
      ROLE: [data.ROLE, Validators.required]
    });

   }

  ngOnInit(): void {}

  updateUser(){
    console.log(this.updateUserForm.value);
    this._userService.updateUser(this.data.id, this.updateUserForm.value).subscribe(data => {
      Swal.fire('Usuario actualizado', 'Se actualizo el usuario correctamente.', 'success');
      this._dialog.closeAll();
    }, err => {
      Swal.fire('Error', 'Hubo un error en la actualizacion del usuario.', 'error');
    })
  }

}
