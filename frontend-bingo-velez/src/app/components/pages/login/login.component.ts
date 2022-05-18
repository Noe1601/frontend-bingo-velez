import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

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
              private _router: Router) { }

  ngOnInit(): void {
  }

  sign(){
    this.Sign = !this.Sign;
  }

  signIn(){
    this._authService.login(this.siningForm.value).subscribe((data: any) => {
      this._sharedService.setLocalStorage('token', data.token);
      this._sharedService.setLocalStorage('user', data.userAuthenticate.NAME);
      this._router.navigateByUrl('/pages/home');
    }, (err) => {
      Swal.fire('Fallo autenticación',`<b>Error de autenticación</b>`, 'error')
    })
  }

  sendCode(){
    const { EMAIL } = this.sinupForm.value;
    this._authService.sendCode(EMAIL).subscribe(code => {
      this.isVerifyMoment = false;
      this.canShowCodeInput = true;
    });
  }

  signUp(){
    this._authService.registerUser(this.sinupForm.value).subscribe(data => {
      Swal.fire('Registro','Usuario registrado exitosamente','success');
    })
  }
}