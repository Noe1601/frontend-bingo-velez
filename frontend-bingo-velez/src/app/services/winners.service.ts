import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  constructor(private _http: HttpClient) { }

  getWinners(): Observable<any> {
    return this._http.get<any>(`${base_url}/winners`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  getWinner(id: any): Observable<any> {
    return this._http.get<any>(`${base_url}/winners/${ id }`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  createWinner(winner: any){
    return this._http.post<any>(`${ base_url }/winners`, winner) 
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  deleteWinner(winner: any){
    return this._http.delete<any>(`${ base_url }/winners/${ winner }`) 
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  updateWinner(id:any, winner: any){
    return this._http.put<any>(`${ base_url }/winners/${ id }`, winner) 
    .pipe(
      catchError(err => {
        throw err;
      })
    )
  }
}
