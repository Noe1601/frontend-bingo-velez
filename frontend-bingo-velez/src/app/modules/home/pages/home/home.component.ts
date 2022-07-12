import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import { PlayersService } from 'src/app/core/services/players.service';
import { CardBoard } from '../../../enums/cardboard.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: any;
  players: any;
  firstRow: any[] = [];
  secondRow: any[] = [];
  thirdRow: any[] = [];
  fourthRow: any[] = [];
  fifthRow: any[] = [];
  randomNumber: number = 0;
  lastFiveNumbers: string = '';
  numbers: number[] = [];
  genericTable: any[] = [];
  cartonesQuantity: string = String(localStorage.getItem('CantidadDeCartones'));

  constructor(
    private _homeService: HomeService,
    private _playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.items = this._homeService.items(
      this.cartonesQuantity ? Number(this.cartonesQuantity) : 30,
      CardBoard.Default
    );

    this._playerService.getPlayers().subscribe((data) => {
      this.players = data.list;
    });

    this.genericTableLeft();

    localStorage.removeItem('RandomNumber');
  }

  resetCarton(carton: any) {
    var newCarton = this._homeService.newCarton(1, carton.type);

    for (var key in newCarton) {
      var value = newCarton[key];
      value.index = carton.index;
      this.items[carton.index] = value;
    }
  }

  resetAllCarton() {
    this.items = this._homeService.items(
      this.cartonesQuantity ? Number(this.cartonesQuantity) : 30,
      CardBoard.Default
    );
  }

  setColorToCellNumber() {
    this.randomNumber = this._homeService.getRandomInt(1, 75);
    this.lastFivePlays(this.randomNumber);
    localStorage.setItem('RandomNumber', String(this.randomNumber));
    let newItems = this._homeService.searchThroughCartonesToSetNumber(
      this.items
    );
    this.items = newItems;
  }

  lastFivePlays(play: number) {
    if (this.numbers.length == 5) {
      this.numbers.pop();
      this.numbers.unshift(play);
      this.numbers.join(' ');
      return;
    }
    this.numbers.unshift(play);
  }

  getSelectedNumber(number: number) {
    localStorage.setItem('RandomNumber', String(number));
    this.lastFivePlays(number);
    this._homeService.searchThroughCartonesToSetNumber(this.items);
  }

  genericTableLeft() {
    var table = {
      title: {
        B: 'B',
        I: 'I',
        N: 'N',
        G: 'G',
        O: 'O',
      },
      row1: [
        {
          uno: 1,
          dos: 2,
          tres: 3,
          cuatro: 4,
          cinco: 5,
          seis: 6,
          siete: 7,
          ocho: 8,
          nueve: 9,
          diez: 10,
          once: 11,
          doce: 12,
          trece: 13,
          catorce: 14,
          quince: 15,
        },
      ],
      row2: [
        {
          diezyseis: 16,
          diesisiete: 17,
          diezyocho: 18,
          diezynueve: 19,
          veinte: 20,
          veintiuno: 21,
          veintidos: 22,
          veintitres: 23,
          veinticuatro: 24,
          veinticinco: 25,
          veintiseis: 26,
          veintisiete: 27,
          veintiocho: 28,
          veintinueve: 29,
          treinta: 30,
        },
      ],
      row3: [
        {
          treintiuno: 31,
          treintidos: 32,
          treintitres: 33,
          treinticuatro: 34,
          treinticinco: 35,
          treintiseis: 36,
          treintisiete: 37,
          treintiocho: 38,
          treintinueve: 39,
          cuarenta: 40,
          cuarentayuno: 41,
          cuarentaydos: 42,
          cuarentaytres: 43,
          cuarentaycuatro: 44,
          cuarentaycinco: 45,
        },
      ],
      row4: [
        {
          cuarentayseis: 46,
          cuarentaysiete: 47,
          cuarentayocho: 48,
          cuarentaynueve: 49,
          cincuenta: 50,
          cincuentayuno: 51,
          cincuentaydos: 52,
          cincuentaytres: 53,
          cincuentaycuatro: 54,
          cincuentaycinco: 55,
          cincuentayseis: 56,
          cincuentaysiete: 57,
          cincuentayocho: 58,
          cincuentaynueve: 59,
          sesenta: 60,
        },
      ],
      row5: [
        {
          sesentayuno: 61,
          sesentaydos: 62,
          sesentaytres: 63,
          sesentaycuatro: 64,
          sesentaycinco: 65,
          sesentayseis: 66,
          sesentaysiete: 67,
          sesentayocho: 68,
          sesentaynueve: 69,
          setenta: 70,
          setentayuno: 71,
          setentaydos: 72,
          setentaytres: 73,
          setentaycuatro: 74,
          setentaycinco: 75,
        },
      ],
    } as any;
    
    this.genericTable.push(table);
  }
}
