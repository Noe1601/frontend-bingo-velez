import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { ValidateRoleService } from 'src/app/core/services/validation-user-role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: any;
  profileForm: any;
  params: any;
  isAdmin: boolean = false;

  constructor(private _activateRoute: ActivatedRoute,
    private _userService: UsersService,
    private _fb: FormBuilder,
    private _validateRoleService: ValidateRoleService) {}

  ngOnInit(): void {
    this.isAdmin = this._validateRoleService.validationRole;
    this.params = this._activateRoute.snapshot.params['id'];
    this.getProfileInfo(this.params);
  }

  getProfileInfo(id: any){
    this._userService.getUser(id).subscribe(data => {
       this.userProfile = data.listById;

       this.profileForm = this._fb.group({
        NAME: [this.userProfile.NAME, Validators.required],
        EMAIL: [this.userProfile.EMAIL, [Validators.required, Validators.email]],
        ROLE: [this.userProfile.ROLE, Validators.required]
      })
    });
  }

  updateProfile(){
    this._userService.updateUser(this.userProfile.id,this.profileForm.value).subscribe(data => {
      this.getProfileInfo(this.params);
      Swal.fire('Perfil actualizado','Se actualizo el perfil correctamente', 'success');
    }, err => {
      Swal.fire('Error','Ocurrio un fallo en la actualizacion del perfil', 'error');
    })
  }

}
