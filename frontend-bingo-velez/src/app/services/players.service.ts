import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private _http: HttpClient) { }

  getPlayers(): Observable<any> {
    return this._http.get<any>(`${base_url}/jugadores`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  getPlayer(id: any): Observable<any> {
    return this._http.get<any>(`${base_url}/jugadores/${ id }`)
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  createPlayer(player: any){
    return this._http.post<any>(`${ base_url }/jugadores`, player) 
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  deletePlayer(player: any){
    return this._http.delete<any>(`${ base_url }/jugadores/${ player }`) 
      .pipe(
        catchError(err => {
          throw err;
        })
      )
  }

  updatePlayer(id: any,player: any){
    return this._http.put<any>(`${ base_url }/jugadores/${ id }`, player) 
    .pipe(
      catchError(err => {
        throw err;
      })
    )
  }

}
