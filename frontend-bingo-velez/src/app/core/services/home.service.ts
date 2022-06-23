import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}

  cartones: any[] = [];
  column1: number[] = [];
  column2: number[] = [];
  column3: number[] = [];
  column4: number[] = [];
  column5: number[] = [];

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  items(cartonesQuantity: number) {
    this.cartones = [];

    if (cartonesQuantity == 0) {
      cartonesQuantity = Number(localStorage.getItem('CantidadDeCartones'));
    }

    localStorage.setItem('CantidadDeCartones', String(cartonesQuantity));

    for (let i = 0; i < cartonesQuantity; i++) {

      var content = {
        title: {
          B: 'B',
          I: 'I',
          N: 'N',
          G: 'G',
          O: 'O',
        },
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
        index: i
      } as any;

      //generar primera columna aleatoria
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(1,15);

        if(this.column1.length == 5) break;

        var same = this.column1.some(element => element === randomNumber);

        if(!same){
          this.column1.push(randomNumber);
        }
      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(16,30);

        if(this.column2.length == 5) break;

        var same = this.column2.some(element => element === randomNumber);

        if(!same){
          this.column2.push(randomNumber);
        }

      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(31,45);
        
        if(this.column3.length == 5) break;

        var same = this.column3.some(element => element === randomNumber);

        if(!same){
          this.column3.push(randomNumber);
        }
      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(46,60);
        
        if(this.column4.length == 5) break;

        var same = this.column4.some(element => element === randomNumber);

        if(!same){
          this.column4.push(randomNumber);
        }
      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(61,75);
        
        if(this.column5.length == 5) break;

        var same = this.column5.some(element => element === randomNumber);

        if(!same){
          this.column5.push(randomNumber);
        }
      }

      this.column1.forEach((element, index) => {
        if(content.row1.length >= 5){
          return
        }
        content.row1.push({index, number: element, selected: false});
      });

      this.column2.forEach((element, index) => {
        if(content.row2.length >= 5){
          return
        }
        content.row2.push({index, number: element, selected: false});
      });

      this.column3.forEach((element, index) => {
        if(content.row3.length >= 5){
          return
        }
        if(content.row3.length == 2){
          content.row3.push({index, image: "../../../assets/img/logos/dollar.svg"})
        }
        content.row3.push({index, number: element, selected: false});
      });

      this.column4.forEach((element, index) => {
        if(content.row4.length >= 5){
          return
        }
        content.row4.push({index, number: element, selected: false});
      });

      this.column5.forEach((element, index) => {
        if(content.row5.length >= 5){
          return
        }
        content.row5.push({index, number: element, selected: false});
      });
      
      this.column1 = [];
      this.column2 = [];
      this.column3 = [];
      this.column4 = [];
      this.column5 = [];
      
      this.cartones.push(content);
      content = {};
    }
    
    console.log(this.cartones);
    return this.cartones;
  }

  nuevoCarton(cartonesQuantity: number) {
    this.cartones = [];

    if (cartonesQuantity == 0) {
      cartonesQuantity = Number(localStorage.getItem('CantidadDeCartones'));
    }

    for (let i = 0; i < cartonesQuantity; i++) {

      var content = {
        title: {
          B: 'B',
          I: 'I',
          N: 'N',
          G: 'G',
          O: 'O',
        },
        row1: [],
        row2: [],
        row3: [],
        row4: [],
        row5: [],
        index: i
      } as any;

      //generar primera columna aleatoria
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(1,15);

        if(this.column1.length == 5) break;

        var same = this.column1.some(element => element === randomNumber);

        if(!same){
          this.column1.push(randomNumber);
        }
      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(16,30);

        if(this.column2.length == 5) break;

        var same = this.column2.some(element => element === randomNumber);

        if(!same){
          this.column2.push(randomNumber);
        }

      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(31,45);
        
        if(this.column3.length == 5) break;

        var same = this.column3.some(element => element === randomNumber);

        if(!same){
          this.column3.push(randomNumber);
        }
      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(46,60);
        
        if(this.column4.length == 5) break;

        var same = this.column4.some(element => element === randomNumber);

        if(!same){
          this.column4.push(randomNumber);
        }
      }
      for(let i = 0; i < Infinity; i++){
        let randomNumber = this.getRandomInt(61,75);
        
        if(this.column5.length == 5) break;

        var same = this.column5.some(element => element === randomNumber);

        if(!same){
          this.column5.push(randomNumber);
        }
      }

      this.column1.forEach((element, index) => {
        if(content.row1.length >= 5){
          return
        }
        content.row1.push({index, number: element, selected: true});
      });

      this.column2.forEach((element, index) => {
        if(content.row2.length >= 5){
          return
        }
        content.row2.push({index, number: element, selected: false});
      });

      this.column3.forEach((element, index) => {
        if(content.row3.length >= 5){
          return
        }
        if(content.row3.length == 2){
          content.row3.push({index, image: "../../../assets/img/logos/dollar.svg"})
        }
        content.row3.push({index, number: element, selected: false});
      });

      this.column4.forEach((element, index) => {
        if(content.row4.length >= 5){
          return
        }
        content.row4.push({index, number: element, selected: false});
      });

      this.column5.forEach((element, index) => {
        if(content.row5.length >= 5){
          return
        }
        content.row5.push({index, number: element, selected: false});
      });
      
      this.column1 = [];
      this.column2 = [];
      this.column3 = [];
      this.column4 = [];
      this.column5 = [];
      
      this.cartones.push(content);
      content = {};
    }
    console.log(this.cartones[0]);
    return this.cartones;
  }
}
