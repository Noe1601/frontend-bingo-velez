import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveDuplicatedService {

    transform(array: any, prop: any): any {
        var newArray = [];
        var lookupObject: any = {};
        for (var i in array) {
          lookupObject[array[i][prop]] = array[i];
        }
    
        for (var i in lookupObject) {
          newArray.push(lookupObject[i]);
        }
    
        return newArray;
      }

}