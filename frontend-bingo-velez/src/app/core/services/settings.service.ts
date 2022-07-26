import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private _http: HttpClient) { }

    getAllSettings(): Observable<any> {
        return this._http.get<any>(`${base_url}/settings`)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    getSettingById(id: any): Observable<any> {
        return this._http.get<any>(`${base_url}/settings/${id}`)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    updateSettings(id: any, setting: any) {
        return this._http.put<any>(`${base_url}/settings/${id}`, setting)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }


    getPartidas(): Observable<any> {
        return this._http.get<any>(`${base_url}/partidas`)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    createPartida(body: any): Observable<any> {
        return this._http.post<any>(`${base_url}/partidas`, body)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    updatePartida(body: any, id: any): Observable<any> {
        return this._http.put<any>(`${base_url}/partidas/${id}`, body)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    getJugadorPartida(): Observable<any> {
        return this._http.get<any>(`${base_url}/partida-jugador`)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    createJugadorPartida(body: any): Observable<any> {
        return this._http.post<any>(`${base_url}/partida-jugador`, body)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    updateJugadorPartida(body: any, id: any): Observable<any> {
        return this._http.put<any>(`${base_url}/partida-jugador/${id}`, body)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }

    getPlayersByPartida(id: any): Observable<any> {
        return this._http.get<any>(`${base_url}/partida-jugador/partidas/${id}`)
            .pipe(
                catchError(err => {
                    throw err;
                })
            )
    }
}
