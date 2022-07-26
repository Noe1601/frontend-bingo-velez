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
        content.row1.push({
          index,
          number: element,
          selected: false,
          editMode: false,
          cosita: false,
          medio: false,
          sumita: false,
          letraT: false,
          regular: false,
          esquinas: false,
          deldia: false,
          x: false,
          l: false,
          lleno: false,
          mediaC: false,
          cometa: false,
          class: '',
          isPlayerselected: false,
          itMode: false,
          playerSelected: null,
        });
      });

      this.column2.forEach((element, index) => {
        if (content.row2.length >= 5) {
          return;
        }
        content.row2.push({
          index,
          number: element,
          selected: false,
          editMode: false,
          class: '',
        });
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
            selected: true,
          });
        }
        content.row3.push({
          index,
          number: element,
          selected: false,
          editMode: false,
          class: '',
        });
      });

      this.column4.forEach((element, index) => {
        if (content.row4.length >= 5) {
          return;
        }
        content.row4.push({
          index,
          number: element,
          selected: false,
          editMode: false,
          class: '',
        });
      });

      this.column5.forEach((element, index) => {
        if (content.row5.length >= 5) {
          return;
        }
        content.row5.push({
          index,
          number: element,
          selected: false,
          editMode: false,
          class: '',
        });
      });

      this.column1 = [];
      this.column2 = [];
      this.column3 = [];
      this.column4 = [];
      this.column5 = [];

      this.cartones.unshift(content);

      content = {};
    }

    return this.cartones;
  }

  newCarton(cartonesQuantity: number, cartonType: string) {
    this.cartones = [];

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
        content.row1.push({
          index,
          number: element,
          selected: false,
          editMode: false,
        });
      });

      this.column2.forEach((element, index) => {
        if (content.row2.length >= 5) {
          return;
        }
        content.row2.push({
          index,
          number: element,
          selected: false,
          editMode: false,
        });
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
        content.row3.push({
          index,
          number: element,
          selected: false,
          editMode: false,
        });
      });

      this.column4.forEach((element, index) => {
        if (content.row4.length >= 5) {
          return;
        }
        content.row4.push({
          index,
          number: element,
          selected: false,
          editMode: false,
        });
      });

      this.column5.forEach((element, index) => {
        if (content.row5.length >= 5) {
          return;
        }
        content.row5.push({
          index,
          number: element,
          selected: false,
          editMode: false,
        });
      });

      this.column1 = [];
      this.column2 = [];
      this.column3 = [];
      this.column4 = [];
      this.column5 = [];

      this.cartones.push(content);
      content = {};
    }
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

  searchThroughLeftCartonToSetNumber(item: any) {
    var randomNumber = Number(localStorage.getItem('RandomNumber'));

    if (randomNumber == null) return;

    var indexOf: any;

    if (randomNumber >= 1 && randomNumber <= 15) {
      indexOf = item.row1[0].number == randomNumber;
      if (indexOf) {
        item.row1[0].selected = true;
      }
      indexOf = item.row1[1].number == randomNumber;
      if (indexOf) {
        item.row1[1].selected = true;
      }
      indexOf = item.row1[2].number == randomNumber;
      if (indexOf) {
        item.row1[2].selected = true;
      }
      indexOf = item.row1[3].number == randomNumber;
      if (indexOf) {
        item.row1[3].selected = true;
      }
      indexOf = item.row1[4].number == randomNumber;
      if (indexOf) {
        item.row1[4].selected = true;
      }
      indexOf = item.row1[5].number == randomNumber;
      if (indexOf) {
        item.row1[5].selected = true;
      }
      indexOf = item.row1[6].number == randomNumber;
      if (indexOf) {
        item.row1[6].selected = true;
      }
      indexOf = item.row1[7].number == randomNumber;
      if (indexOf) {
        item.row1[7].selected = true;
      }
      indexOf = item.row1[8].number == randomNumber;
      if (indexOf) {
        item.row1[8].selected = true;
      }
      indexOf = item.row1[9].number == randomNumber;
      if (indexOf) {
        item.row1[9].selected = true;
      }
      indexOf = item.row1[10].number == randomNumber;
      if (indexOf) {
        item.row1[10].selected = true;
      }
      indexOf = item.row1[11].number == randomNumber;
      if (indexOf) {
        item.row1[11].selected = true;
      }
      indexOf = item.row1[12].number == randomNumber;
      if (indexOf) {
        item.row1[12].selected = true;
      }
      indexOf = item.row1[13].number == randomNumber;
      if (indexOf) {
        item.row1[13].selected = true;
      }
      indexOf = item.row1[14].number == randomNumber;
      if (indexOf) {
        item.row1[14].selected = true;
      }
    }

    if (randomNumber >= 16 && randomNumber <= 30) {
      indexOf = item.row2[0].number == randomNumber;
      if (indexOf) {
        item.row2[0].selected = true;
      }
      indexOf = item.row2[1].number == randomNumber;
      if (indexOf) {
        item.row2[1].selected = true;
      }
      indexOf = item.row2[2].number == randomNumber;
      if (indexOf) {
        item.row2[2].selected = true;
      }
      indexOf = item.row2[3].number == randomNumber;
      if (indexOf) {
        item.row2[3].selected = true;
      }
      indexOf = item.row2[4].number == randomNumber;
      if (indexOf) {
        item.row2[4].selected = true;
      }
      indexOf = item.row2[5].number == randomNumber;
      if (indexOf) {
        item.row2[5].selected = true;
      }
      indexOf = item.row2[6].number == randomNumber;
      if (indexOf) {
        item.row2[6].selected = true;
      }
      indexOf = item.row2[7].number == randomNumber;
      if (indexOf) {
        item.row2[7].selected = true;
      }
      indexOf = item.row2[8].number == randomNumber;
      if (indexOf) {
        item.row2[8].selected = true;
      }
      indexOf = item.row2[9].number == randomNumber;
      if (indexOf) {
        item.row2[9].selected = true;
      }
      indexOf = item.row2[10].number == randomNumber;
      if (indexOf) {
        item.row2[10].selected = true;
      }
      indexOf = item.row2[11].number == randomNumber;
      if (indexOf) {
        item.row2[11].selected = true;
      }
      indexOf = item.row2[12].number == randomNumber;
      if (indexOf) {
        item.row2[12].selected = true;
      }
      indexOf = item.row2[13].number == randomNumber;
      if (indexOf) {
        item.row2[13].selected = true;
      }
      indexOf = item.row2[14].number == randomNumber;
      if (indexOf) {
        item.row2[14].selected = true;
      }
    }

    if (randomNumber >= 31 && randomNumber <= 45) {
      indexOf = item.row3[0].number == randomNumber;
      if (indexOf) {
        item.row3[0].selected = true;
      }
      indexOf = item.row3[1].number == randomNumber;
      if (indexOf) {
        item.row3[1].selected = true;
      }
      indexOf = item.row3[2].number == randomNumber;
      if (indexOf) {
        item.row3[2].selected = true;
      }
      indexOf = item.row3[3].number == randomNumber;
      if (indexOf) {
        item.row3[3].selected = true;
      }
      indexOf = item.row3[4].number == randomNumber;
      if (indexOf) {
        item.row3[4].selected = true;
      }
      indexOf = item.row3[5].number == randomNumber;
      if (indexOf) {
        item.row3[5].selected = true;
      }
      indexOf = item.row3[6].number == randomNumber;
      if (indexOf) {
        item.row3[6].selected = true;
      }
      indexOf = item.row3[7].number == randomNumber;
      if (indexOf) {
        item.row3[7].selected = true;
      }
      indexOf = item.row3[8].number == randomNumber;
      if (indexOf) {
        item.row3[8].selected = true;
      }
      indexOf = item.row3[9].number == randomNumber;
      if (indexOf) {
        item.row3[9].selected = true;
      }
      indexOf = item.row3[10].number == randomNumber;
      if (indexOf) {
        item.row3[10].selected = true;
      }
      indexOf = item.row3[11].number == randomNumber;
      if (indexOf) {
        item.row3[11].selected = true;
      }
      indexOf = item.row3[12].number == randomNumber;
      if (indexOf) {
        item.row3[12].selected = true;
      }
      indexOf = item.row3[13].number == randomNumber;
      if (indexOf) {
        item.row3[13].selected = true;
      }
      indexOf = item.row3[14].number == randomNumber;
      if (indexOf) {
        item.row3[14].selected = true;
      }
    }

    if (randomNumber >= 46 && randomNumber <= 60) {
      indexOf = item.row4[0].number == randomNumber;
      if (indexOf) {
        item.row4[0].selected = true;
      }
      indexOf = item.row4[1].number == randomNumber;
      if (indexOf) {
        item.row4[1].selected = true;
      }
      indexOf = item.row4[2].number == randomNumber;
      if (indexOf) {
        item.row4[2].selected = true;
      }
      indexOf = item.row4[3].number == randomNumber;
      if (indexOf) {
        item.row4[3].selected = true;
      }
      indexOf = item.row4[4].number == randomNumber;
      if (indexOf) {
        item.row4[4].selected = true;
      }
      indexOf = item.row4[5].number == randomNumber;
      if (indexOf) {
        item.row4[5].selected = true;
      }
      indexOf = item.row4[6].number == randomNumber;
      if (indexOf) {
        item.row4[6].selected = true;
      }
      indexOf = item.row4[7].number == randomNumber;
      if (indexOf) {
        item.row4[7].selected = true;
      }
      indexOf = item.row4[8].number == randomNumber;
      if (indexOf) {
        item.row4[8].selected = true;
      }
      indexOf = item.row4[9].number == randomNumber;
      if (indexOf) {
        item.row4[9].selected = true;
      }
      indexOf = item.row4[10].number == randomNumber;
      if (indexOf) {
        item.row4[10].selected = true;
      }
      indexOf = item.row4[11].number == randomNumber;
      if (indexOf) {
        item.row4[11].selected = true;
      }
      indexOf = item.row4[12].number == randomNumber;
      if (indexOf) {
        item.row4[12].selected = true;
      }
      indexOf = item.row4[13].number == randomNumber;
      if (indexOf) {
        item.row4[13].selected = true;
      }
      indexOf = item.row4[14].number == randomNumber;
      if (indexOf) {
        item.row4[14].selected = true;
      }
    }

    if (randomNumber >= 61 && randomNumber <= 75) {
      indexOf = item.row5[0].number == randomNumber;
      if (indexOf) {
        item.row5[0].selected = true;
      }
      indexOf = item.row5[1].number == randomNumber;
      if (indexOf) {
        item.row5[1].selected = true;
      }
      indexOf = item.row5[2].number == randomNumber;
      if (indexOf) {
        item.row5[2].selected = true;
      }
      indexOf = item.row5[3].number == randomNumber;
      if (indexOf) {
        item.row5[3].selected = true;
      }
      indexOf = item.row5[4].number == randomNumber;
      if (indexOf) {
        item.row5[4].selected = true;
      }
      indexOf = item.row5[5].number == randomNumber;
      if (indexOf) {
        item.row5[5].selected = true;
      }
      indexOf = item.row5[6].number == randomNumber;
      if (indexOf) {
        item.row5[6].selected = true;
      }
      indexOf = item.row5[7].number == randomNumber;
      if (indexOf) {
        item.row5[7].selected = true;
      }
      indexOf = item.row5[8].number == randomNumber;
      if (indexOf) {
        item.row5[8].selected = true;
      }
      indexOf = item.row5[9].number == randomNumber;
      if (indexOf) {
        item.row5[9].selected = true;
      }
      indexOf = item.row5[10].number == randomNumber;
      if (indexOf) {
        item.row5[10].selected = true;
      }
      indexOf = item.row5[11].number == randomNumber;
      if (indexOf) {
        item.row5[11].selected = true;
      }
      indexOf = item.row5[12].number == randomNumber;
      if (indexOf) {
        item.row5[12].selected = true;
      }
      indexOf = item.row5[13].number == randomNumber;
      if (indexOf) {
        item.row5[13].selected = true;
      }
      indexOf = item.row5[14].number == randomNumber;
      if (indexOf) {
        item.row5[14].selected = true;
      }
    }
    console.log(item);
    return item;
  }
}
