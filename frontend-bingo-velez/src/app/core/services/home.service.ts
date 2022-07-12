import { Injectable } from '@angular/core';
import { CardBoard } from '../../modules/enums/cardboard.enum';

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
  cartonType: number = 0;

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  items(cartonesQuantity: number, cartonType: string) {
    this.cartones = [];
    var quantity: number = 0;
    var carton: any;
    if (cartonesQuantity == 0) {
      cartonesQuantity = Number(localStorage.getItem('CantidadDeCartones'));
    }
    //validate if 
    // if(Number(localStorage.getItem("diamante")) != 0){
    //   quantity = cartonesQuantity - Number(localStorage.getItem("diamante"));
    //   carton = this.newCarton(Number(localStorage.getItem("diamante")), CardBoard.Diamond);
    //   this.cartones.push(carton);
    //   carton = [];
    // }
    // if(Number(localStorage.getItem("diamanteNegro")) != 0){
    //   quantity = cartonesQuantity - Number(localStorage.getItem("diamanteNegro"));
    //   carton = this.newCarton(Number(localStorage.getItem("diamanteNegro")), CardBoard.DarkDiamond);
    //   this.cartones.push(carton); 
    //   carton = [];   
    // }
    // if(Number(localStorage.getItem("ruby")) != 0){
    //   quantity = cartonesQuantity - Number(localStorage.getItem("ruby"));
    //   carton = this.newCarton(Number(localStorage.getItem("ruby")), CardBoard.Ruby);
    //   this.cartones.push(carton);
    //   carton = [];    
    // }

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
        index: i,
        type: cartonType,
      } as any;

      //generar primera columna aleatoria
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(1, 15);

        if (this.column1.length == 5) break;

        var same = this.column1.some((element) => element === randomNumber);

        if (!same) {
          this.column1.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(16, 30);

        if (this.column2.length == 5) break;

        var same = this.column2.some((element) => element === randomNumber);

        if (!same) {
          this.column2.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(31, 45);

        if (this.column3.length == 5) break;

        var same = this.column3.some((element) => element === randomNumber);

        if (!same) {
          this.column3.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(46, 60);

        if (this.column4.length == 5) break;

        var same = this.column4.some((element) => element === randomNumber);

        if (!same) {
          this.column4.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(61, 75);

        if (this.column5.length == 5) break;

        var same = this.column5.some((element) => element === randomNumber);

        if (!same) {
          this.column5.push(randomNumber);
        }
      }

      this.column1.forEach((element, index) => {
        if (content.row1.length >= 5) {
          return;
        }
        content.row1.push({ index, number: element, selected: false });
      });

      this.column2.forEach((element, index) => {
        if (content.row2.length >= 5) {
          return;
        }
        content.row2.push({ index, number: element, selected: false });
      });

      this.column3.forEach((element, index) => {
        if (content.row3.length >= 5) {
          return;
        }

        let Image;

        if (cartonType == CardBoard.Default) {
          Image = '../../../assets/img/logos/dollar.svg';
        }
        if (cartonType == CardBoard.Diamond) {
          Image = '../../../assets/img/logos/diamond.svg';
        }
        if (cartonType == CardBoard.DarkDiamond) {
          Image = '../../../assets/img/logos/diamondDark.svg';
        }
        if (cartonType == CardBoard.Ruby) {
          Image = '../../../assets/img/logos/jewel.svg';
        }

        if (content.row3.length == 2) {
          content.row3.push({
            index,
            image: Image,
          });
        }
        content.row3.push({ index, number: element, selected: false });
      });

      this.column4.forEach((element, index) => {
        if (content.row4.length >= 5) {
          return;
        }
        content.row4.push({ index, number: element, selected: false });
      });

      this.column5.forEach((element, index) => {
        if (content.row5.length >= 5) {
          return;
        }
        content.row5.push({ index, number: element, selected: false });
      });

      this.column1 = [];
      this.column2 = [];
      this.column3 = [];
      this.column4 = [];
      this.column5 = [];
      
      this.cartones.unshift(content);

      content = {};
    }

    console.log(this.cartones);
    return this.cartones;
  }

  newCarton(cartonesQuantity: number, cartonType: string) {
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
        index: i,
        type: cartonType,
      } as any;

      //generar primera columna aleatoria
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(1, 15);

        if (this.column1.length == 5) break;

        var same = this.column1.some((element) => element === randomNumber);

        if (!same) {
          this.column1.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(16, 30);

        if (this.column2.length == 5) break;

        var same = this.column2.some((element) => element === randomNumber);

        if (!same) {
          this.column2.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(31, 45);

        if (this.column3.length == 5) break;

        var same = this.column3.some((element) => element === randomNumber);

        if (!same) {
          this.column3.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(46, 60);

        if (this.column4.length == 5) break;

        var same = this.column4.some((element) => element === randomNumber);

        if (!same) {
          this.column4.push(randomNumber);
        }
      }
      for (let i = 0; i < Infinity; i++) {
        let randomNumber = this.getRandomInt(61, 75);

        if (this.column5.length == 5) break;

        var same = this.column5.some((element) => element === randomNumber);

        if (!same) {
          this.column5.push(randomNumber);
        }
      }

      this.column1.forEach((element, index) => {
        if (content.row1.length >= 5) {
          return;
        }
        content.row1.push({ index, number: element, selected: false });
      });

      this.column2.forEach((element, index) => {
        if (content.row2.length >= 5) {
          return;
        }
        content.row2.push({ index, number: element, selected: false });
      });

      this.column3.forEach((element, index) => {
        if (content.row3.length >= 5) {
          return;
        }

        let Image;

        if (cartonType == CardBoard.Default) {
          Image = '../../../assets/img/logos/dollar.svg';
        }
        if (cartonType == CardBoard.Diamond) {
          Image = '../../../assets/img/logos/diamond.svg';
        }
        if (cartonType == CardBoard.DarkDiamond) {
          Image = '../../../assets/img/logos/diamondDark.svg';
        }
        if (cartonType == CardBoard.Ruby) {
          Image = '../../../assets/img/logos/jewel.svg';
        }

        if (content.row3.length == 2) {
          content.row3.push({
            index,
            image: Image,
          });
        }
        content.row3.push({ index, number: element, selected: false });
      });

      this.column4.forEach((element, index) => {
        if (content.row4.length >= 5) {
          return;
        }
        content.row4.push({ index, number: element, selected: false });
      });

      this.column5.forEach((element, index) => {
        if (content.row5.length >= 5) {
          return;
        }
        content.row5.push({ index, number: element, selected: false });
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

  searchThroughCartonesToSetNumber(items: any) {
    var newItems: any[] = [];

    var randomNumber = Number(localStorage.getItem('RandomNumber'));

    if (randomNumber == null) return;

    for (let i = 0; i < items.length; i++) {
      var carton = items[i];
      var indexOf: any;

      if (randomNumber >= 1 && randomNumber <= 15) {
        indexOf = carton.row1[0].number == randomNumber;
        if (indexOf) {
          carton.row1[0].selected = true;
        }
        indexOf = carton.row1[1].number == randomNumber;
        if (indexOf) {
          carton.row1[1].selected = true;
        }
        indexOf = carton.row1[2].number == randomNumber;
        if (indexOf) {
          carton.row1[2].selected = true;
        }
        indexOf = carton.row1[3].number == randomNumber;
        if (indexOf) {
          carton.row1[3].selected = true;
        }
        indexOf = carton.row1[4].number == randomNumber;
        if (indexOf) {
          carton.row1[4].selected = true;
        }
      }
      if (randomNumber >= 16 && randomNumber <= 30) {
        indexOf = carton.row2[0].number == randomNumber;
        if (indexOf) {
          carton.row2[0].selected = true;
        }
        indexOf = carton.row2[1].number == randomNumber;
        if (indexOf) {
          carton.row2[1].selected = true;
        }
        indexOf = carton.row2[2].number == randomNumber;
        if (indexOf) {
          carton.row2[2].selected = true;
        }
        indexOf = carton.row2[3].number == randomNumber;
        if (indexOf) {
          carton.row2[3].selected = true;
        }
        indexOf = carton.row2[4].number == randomNumber;
        if (indexOf) {
          carton.row2[4].selected = true;
        }
      }
      if (randomNumber >= 31 && randomNumber <= 45) {
        indexOf = carton.row3[0].number == randomNumber;
        if (indexOf) {
          carton.row3[0].selected = true;
        }
        indexOf = carton.row3[1].number == randomNumber;
        if (indexOf) {
          carton.row3[1].selected = true;
        }
        indexOf = carton.row3[2].number == randomNumber;
        if (indexOf) {
          carton.row3[2].selected = true;
        }
        indexOf = carton.row3[3].number == randomNumber;
        if (indexOf) {
          carton.row3[3].selected = true;
        }
        indexOf = carton.row3[4].number == randomNumber;
        if (indexOf) {
          carton.row3[4].selected = true;
        }
      }
      if (randomNumber >= 46 && randomNumber <= 60) {
        indexOf = carton.row4[0].number == randomNumber;
        if (indexOf) {
          carton.row4[0].selected = true;
        }
        indexOf = carton.row4[1].number == randomNumber;
        if (indexOf) {
          carton.row4[1].selected = true;
        }
        indexOf = carton.row4[2].number == randomNumber;
        if (indexOf) {
          carton.row4[2].selected = true;
        }
        indexOf = carton.row4[3].number == randomNumber;
        if (indexOf) {
          carton.row4[3].selected = true;
        }
        indexOf = carton.row4[4].number == randomNumber;
        if (indexOf) {
          carton.row4[4].selected = true;
        }
      }
      if (randomNumber >= 61 && randomNumber <= 75) {
        indexOf = carton.row5[0].number == randomNumber;
        if (indexOf) {
          carton.row5[0].selected = true;
        }
        indexOf = carton.row5[1].number == randomNumber;
        if (indexOf) {
          carton.row5[1].selected = true;
        }
        indexOf = carton.row5[2].number == randomNumber;
        if (indexOf) {
          carton.row5[2].selected = true;
        }
        indexOf = carton.row5[3].number == randomNumber;
        if (indexOf) {
          carton.row5[3].selected = true;
        }
        indexOf = carton.row5[4].number == randomNumber;
        if (indexOf) {
          carton.row5[4].selected = true;
        }
      }

      newItems.push(carton);
    }

    return newItems;
  }
}
