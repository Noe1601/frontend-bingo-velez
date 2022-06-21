import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperate-password',
  templateUrl: './recuperate-password.component.html',
  styleUrls: ['./recuperate-password.component.scss']
})
export class RecuperatePasswordComponent implements OnInit {

  public canShowCodeInput: boolean = false;
  public isVerifyMoment: boolean = true;

  public recuperateForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    code: ['', Validators.required]
  });

  constructor(private _formBuilder: FormBuilder, 
              private _authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  sendCode() {
    const { email } = this.recuperateForm.value;

      this._authService.sendCode(email).subscribe(code => {
        this.isVerifyMoment = false;
        this.canShowCodeInput = true;
      });
  }

  updatePassword(){

    const { email, password, code} = this.recuperateForm.value;

    const recuperatePasswordModel = {
      email,
      code_confirmation: code,
      password
    }

    this._authService.recuperatePassword(recuperatePasswordModel).subscribe(data => {
      this.dialog.closeAll();
      Swal.fire('Felicidades', data.message, 'success');
    }, err => {
      this.dialog.closeAll();
      Swal.fire('Error', 'Fallo el cambio de contrasena', 'error');
    })
  }
}
