import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { RegisterUser } from 'src/app/core/interfaces/auth-model';
import Swal from 'sweetalert2';
import { RecuperatePasswordComponent } from '../../../../core/components/recuperate-password/recuperate-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Sign: boolean = false;
  canShowCodeInput: boolean = false;
  isVerifyMoment: boolean = true;
  siningForm: FormGroup;
  sinupForm: FormGroup;
  recuperateForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _sharedService: SharedService,
    private _router: Router,
    public dialog: MatDialog) {

      this.siningForm = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

      this.sinupForm = this._formBuilder.group({
        EMAIL: ['', [Validators.required, Validators.email]],
        PASSWORD: ['', Validators.required],
        NAME: ['', Validators.required],
        CODE: ['', Validators.required],
        ROLE: ['USER_ROLE', Validators.required],
        STATUS: [true, Validators.required],
      });

      this.recuperateForm = this._formBuilder.group({
        password: ['', Validators.required],
        code: ['', Validators.required]
      });
     }

  ngOnInit(): void { }


  isValid(value: string) {
    return this.sinupForm.get(value)?.invalid && this.sinupForm.get(value)?.touched
  }

  sign() {
    this.Sign = !this.Sign;
  }

  signIn() {
    this._authService.login(this.siningForm.value).subscribe((data: any) => {
      this._sharedService.setLocalStorage('token', data.token);
      this._sharedService.setLocalStorage('user', data.userAuthenticate.NAME);
      this._sharedService.setLocalStorage('id', data.userAuthenticate.id);
      this._sharedService.setLocalStorage('role', data.userAuthenticate.ROLE);
      this._router.navigateByUrl('/pages/home');
    }, (err) => {
      Swal.fire('Fallo autenticación', err.error.message, 'error')
    })
  }

  sendCode(email?: string) {
    const { EMAIL } = this.sinupForm.value;

    this._authService.sendCode(email == null ? EMAIL : email).subscribe(code => {
      this.isVerifyMoment = false;
      this.canShowCodeInput = true;
      Swal.fire('Codigo de verificacion', `Se envio correctamente el codigo de verificacion, revise el correo: ${ email }`, 'success');
    }, err => {
      Swal.fire('Fallo envio de correo', err.error.message, 'error');
    });
  }

  signUp() {
    const { EMAIL, PASSWORD, NAME, CODE } = this.sinupForm.value;

    const userModel: RegisterUser = {
      EMAIL,
      PASSWORD,
      NAME,
      CODE,
      ROLE: 'USERS_ROLE'
    }

    if (this.sinupForm.invalid) {
      Swal.fire('Formulario de registro', 'Todos los campos son requeridos', 'error');
    }
    else {
      this._authService.registerUser(userModel).subscribe(data => {
        this.sinupForm.reset();
        Swal.fire('Registro', 'Usuario registrado exitosamente', 'success');
        this.isVerifyMoment = false;
        this.canShowCodeInput = false;
        this.sign();
      }, (err) => {
        Swal.fire('Registro', err.error.message, 'error');
      })
    }

  }


  showModal() {
    this.dialog.open(RecuperatePasswordComponent, {
      width: '500px',
    });
  }
}