import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private _http: HttpClient) { }

  getImages(): Observable<any>{
    return this._http.get<any>(`${ base_url }/upload-field`)
  }

//   saveImage(): Observable<any>{
//     return this._http.post<any>(`${ base_url }/upload-field`)
//   }
}
