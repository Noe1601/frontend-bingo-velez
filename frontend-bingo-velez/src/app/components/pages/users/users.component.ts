import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/models/users-model';
import Swal from 'sweetalert2';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: Users[] = [];
  public userSelected: any;
  
  constructor(private _userService: UsersService,
              private _dialog: MatDialog) { }

  ngOnInit(): void {
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

}
