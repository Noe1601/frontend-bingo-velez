import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  setLocalStorage(key: string, value: string){
    localStorage.setItem(key,JSON.stringify(value));
  }

  getLocalStorage(key: string){
    localStorage.getItem(key);
  }

  removeItemFromLocalStorage(key: string){
    localStorage.removeItem(key);
  }
}
