import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/models/users-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-desactivated',
  templateUrl: './user-desactivated.component.html',
  styleUrls: ['./user-desactivated.component.scss']
})
export class UserDesactivatedComponent implements OnInit {

  public users: Users[] = [];
  
  constructor(private _userService: UsersService) { }

  ngOnInit(): void {
    this.getDesactivatedUsers();
  }

  getDesactivatedUsers(){
    this._userService.getUsersDesactivated().subscribe(data => {
      this.users = data.list;
    });
  }

  activateUser(user: any){
    this._userService.updateUser(user.id, { STATE: true }).subscribe(data => {
      Swal.fire('Usuario activado', 'Se activo el usuario satisfactoriamente.', 'success');
      this.getDesactivatedUsers();
    }, err => {
      Swal.fire('Error', 'Hubo un fallo, comiquese con soporte.', 'error');
    })
  }

}
