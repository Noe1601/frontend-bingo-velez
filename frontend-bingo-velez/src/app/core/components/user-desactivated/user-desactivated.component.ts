import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { Users } from 'src/app/core/interfaces/users-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-desactivated',
  templateUrl: './user-desactivated.component.html',
  styleUrls: ['./user-desactivated.component.scss']
})
export class UserDesactivatedComponent implements OnInit {

  public users: Users[] = [];
  
  constructor(private _userService: UsersService,
              private _router: Router) { }

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

  goToUsersActive(){
    this._router.navigateByUrl('/pages/users');
  }

}
