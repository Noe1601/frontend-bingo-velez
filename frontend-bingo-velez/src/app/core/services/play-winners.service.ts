import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlayWinnerService {

    constructor(private _http: HttpClient) { }

    getPlaysDetailsByPlayer(id: any): Observable<any>{
        return this._http.get(`${ base_url }/playwinners/${ id }`);
    }

    createPlayWinner(object: any): Observable<any> {
      return this._http.post<any>(`${ base_url }/playwinners`, object);
    }

}