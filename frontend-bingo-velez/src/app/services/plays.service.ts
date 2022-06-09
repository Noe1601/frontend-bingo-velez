import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlaysService {

  constructor(private _http: HttpClient) { }

  getPlays(): Observable<any> {
    return this._http.get<any>(`${base_url}/jugadas`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  getPlay(id: any): Observable<any> {
    return this._http.get<any>(`${base_url}/jugadas/${ id }`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  createPlay(play: any){
    return this._http.post<any>(`${ base_url }/jugadas`, play) 
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  deletePlay(play: any){
    return this._http.delete<any>(`${ base_url }/jugadas/${play}`) 
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  updatePlay(id: any, play: any){
    return this._http.put<any>(`${ base_url }/jugadas/${ id }`, play) 
    .pipe(
      catchError(err => {
        throw err;
      })
    )
  }
}
