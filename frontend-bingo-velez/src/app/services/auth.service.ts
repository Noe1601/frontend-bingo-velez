import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
import { LoginResponse, RegisterUser } from 'src/models/auth-model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _http: HttpClient) { }

  sendCode(form: any) {
    const params = new HttpParams()
                  .set('EMAIL', form);

    return this._http.post<any>(`${base_url}/code/${ form }`, {
      params
    })
          .pipe(
            catchError((err) => {
              throw err;
            })
          )
  }

  registerUser(user: RegisterUser) {
    return this._http.post<any>(`${ base_url }/users`, user)
    .pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  login(form: any): Observable<LoginResponse[]> {
    return this._http.post<any>(`${base_url}/auth`, form)
      .pipe(
        catchError((err) => {
          throw err;
        })
      )
  }

  recuperatePassword(form: any): Observable<any>{
    return this._http.put<any>(`${ base_url }/users`, form)
      .pipe(
        catchError((err) => {
          throw err;
        })
      )
  }

}
