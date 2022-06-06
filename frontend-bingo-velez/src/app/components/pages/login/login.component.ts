import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { RegisterUser } from 'src/models/auth-model';
import Swal from 'sweetalert2';
import { RecuperatePasswordComponent } from '../../recuperate-password/recuperate-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Sign: boolean = false;
  canShowCodeInput: boolean = false;
  isVerifyMoment: boolean = true;

  public siningForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  public recuperateForm = this._formBuilder.group({
    password: ['', Validators.required],
    code: ['', Validators.required]
  });

  public sinupForm = this._formBuilder.group({
    EMAIL: ['', [Validators.required, Validators.email]],
    PASSWORD: ['', Validators.required],
    NAME: ['', Validators.required],
    CODE: ['', Validators.required],
    ROLE: ['USER_ROLE', Validators.required],
    STATUS: [true, Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _sharedService: SharedService,
    private _router: Router,
    public dialog: MatDialog) { }

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
    }, err => {
      Swal.fire('Fallo autenticación', err.error.message, 'error');
    });
  }

  signUp() {
    const { EMAIL, PASSWORD, NAME, CODE } = this.sinupForm.value;

    const userModel: RegisterUser = {
      EMAIL,
      PASSWORD,
      NAME,
      CODE,
      ROLE: 'USER_ROLE'
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