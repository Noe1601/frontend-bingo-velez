import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { Users } from 'src/app/core/interfaces/users-model';
import Swal from 'sweetalert2';
import { UpdateUserComponent } from '../../../../core/components/update-user/update-user.component';
import { ValidateRoleService } from 'src/app/core/services/validation-user-role.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: Users[] = [];
  public userSelected: any;
  isAdmin: boolean = false;
  
  constructor(private _userService: UsersService,
              private _dialog: MatDialog,
              private _router: Router,
              private _validateRoleService: ValidateRoleService) { }

  ngOnInit(): void {
    this.isAdmin = this._validateRoleService.validationRole;
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(data => {
      this.users = data.list;
    });
  }

  deleteUser(user: any){
    this._userService.deleteUser(user.id).subscribe(data => {
      Swal.fire('Eliminando usuario', `Se desactivo el usuario ${ user.NAME }`, 'success');
      this.getUsers();
    }, err => {
      Swal.fire('Error', 'Ocurrio un error desactivando este usuario, comuniquese con soporte', 'error');
    })
  }

  openUpdateUserDialog(user: any){
    this._dialog.open(UpdateUserComponent, {
      width: '500px',
      data: user
    });
  }

  goToUsersInactives(){
    this._router.navigateByUrl('/pages/desactivatedUsers');
  }

}
