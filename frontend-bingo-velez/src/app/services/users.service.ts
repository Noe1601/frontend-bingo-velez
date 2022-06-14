import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from 'src/models/users-model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<any>{
    return this._http.get<any>(`${ base_url }/users`).pipe(
      catchError((err) => {
        throw err;
      }) 
    )
  }

  getUsersDesactivated(): Observable<any>{
    return this._http.get<any>(`${ base_url }/users/desactivated`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  getUser(id: any): Observable<any>{
    return this._http.get<any[]>(`${ base_url }/users/${ id }`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  deleteUser(id: any){
    return this._http.delete(`${ base_url }/users/${ id }`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  activateUser(id: any){
    return this._http.get<any>(`${ base_url }/users`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  updateUser(id: any, data: any){
    return this._http.put(`${ base_url }/users/${ id }`, data ).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }
}
