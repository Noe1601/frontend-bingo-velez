import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Injectable({
    providedIn: 'root'
})
export class PartidasService {

    constructor(private _http: HttpClient) { }

    getPartidaJugada(id: any): Observable<any> {
        return this._http.get<any>(`${base_url}/partida-jugada/${id}`)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    createPartidaJugada(id: any,request: any) {
        return this._http.post<any>(`${base_url}/partida-jugada/${ id }`, request)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

}
