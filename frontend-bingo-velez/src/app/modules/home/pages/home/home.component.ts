import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import { PlayWinnerService } from 'src/app/core/services/play-winners.service';
import { PlayersService } from 'src/app/core/services/players.service';
import { CardBoard } from '../../../enums/cardboard.enum';
import { SettingsService } from 'src/app/core/services/settings.service';
import { WinnersService } from 'src/app/core/services/winners.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  partidas: any;
  preventSimpleClick: boolean = false;
  newNumber: number = 0;

  partidasForm: FormGroup;

  constructor(
    private _homeService: HomeService,
    private _playerService: PlayersService,
    private _settingsService: SettingsService,
    private _winnerService: WinnersService,
    private _playWinnerService: PlayWinnerService,
    private _fb: FormBuilder
  ) {
    this.partidasForm = this._fb.group({
      partida_id: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.getPartidas();

    // this._settingsService.getAllSettings().subscribe((setting: any) => {
    //   setting.settings.forEach((s: any) => {

    //     if (s.name.toLowerCase() === 'cartones') {
    //       this.items = this._homeService.items(
    //         s.value ? Number(s.value) : 30, CardBoard.Default
    //       );
    //     }

    //   })
    // })

    this.items = this._homeService.items(18, CardBoard.Default).reverse();

    // let diamondCardboard = this._homeService.items(1, CardBoard.Diamond);
    // let rubyCardboard = this._homeService.items(1, CardBoard.DarkDiamond);
    // let diamondDarkCardboard = this._homeService.items(1, CardBoard.Ruby);

    // diamondCardboard.forEach((element: any) => {
    //   element.index = this.items.length;
    //   this.items.push(element);
    // })

    // rubyCardboard.forEach((element: any) => {
    //   element.index = this.items.length;
    //   this.items.push(element);
    // })

    // diamondDarkCardboard.forEach((element: any) => {
    //   element.index = this.items.length;
    //   this.items.push(element);
    // })

    // this._playerService.getPlayers().subscribe((data) => {
    //   this.players = data.list;
    // });

    this.genericTableLeft();

    console.log(this.items);

    localStorage.removeItem('RandomNumber');
  }

  EraseAll() {
    this.items = this._homeService.items(18, CardBoard.Default).reverse();

    let diamondCardboard = this._homeService.items(1, CardBoard.Diamond);
    let rubyCardboard = this._homeService.items(1, CardBoard.DarkDiamond);
    let diamondDarkCardboard = this._homeService.items(1, CardBoard.Ruby);

    diamondCardboard.forEach((element: any) => {
      element.index = this.items.length;
      this.items.push(element);
    });

    rubyCardboard.forEach((element: any) => {
      element.index = this.items.length;
      this.items.push(element);
    });

    diamondDarkCardboard.forEach((element: any) => {
      element.index = this.items.length;
      this.items.push(element);
    });

    this._playerService.getPlayers().subscribe((data) => {
      this.players = data.list;
    });

    this.genericTable = [];
    this.numbers = [];
    this.genericTableLeft();
  }

  getPartidas() {
    this._settingsService.getPartidas().subscribe((data) => {
      this.partidas = data.list;
    });
  }

  selectPartida(event: any) {
   const partida = event.value;

   this._settingsService.getPlayersByPartida(partida).subscribe(data => {
    this.players = data.jugadores;
   })
  }

  selectPlayer(carton: any, event: any) {
    carton.row1.isPlayerSelected = true;
    carton.row1.playerSelected = Number(event.target.value);
  }

  resetCarton(carton: any) {
    var newCarton = this._homeService.newCarton(1, carton.type);
    debugger;
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

  changeCellToEditMode(
    carton: any,
    number: number,
    newNumber: number,
    toSave: boolean
  ) {
    newNumber = Number(newNumber);

    if (newNumber == number) {
      alert(`El nuevo número es el mismo que el anterior`);
      return;
    }
    if(newNumber > 75 || newNumber < 0){
      alert(`El nuevo número no puede ser mayor de 75 ni menor de 0`);
      return;
    }
    if (number <= 15) {
      if (carton.row1[0].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row1[1].number ||
            newNumber == carton.row1[2].number ||
            newNumber == carton.row1[3].number ||
            newNumber == carton.row1[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          if (newNumber > 15) {
            alert('No se aceptan números mayores de 15');
            return;
          }
          carton.row1[0].editMode = false;
          carton.row1[0].selected = false;
          carton.row1[0].number =
            newNumber == 0 ? carton.row1[0].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row1[0].editMode = true;
        }
      }
      if (carton.row1[1].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row1[0].number ||
            newNumber == carton.row1[2].number ||
            newNumber == carton.row1[3].number ||
            newNumber == carton.row1[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row1[1].editMode = false;
          carton.row1[1].selected = false;
          carton.row1[1].number =
            newNumber == 0 ? carton.row1[1].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row1[1].editMode = true;
        }
      }
      if (carton.row1[2].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row1[0].number ||
            newNumber == carton.row1[1].number ||
            newNumber == carton.row1[3].number ||
            newNumber == carton.row1[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row1[2].editMode = false;
          carton.row1[2].selected = false;
          carton.row1[2].number =
            newNumber == 0 ? carton.row1[2].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row1[2].editMode = true;
        }
      }
      if (carton.row1[3].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row1[0].number ||
            newNumber == carton.row1[1].number ||
            newNumber == carton.row1[2].number ||
            newNumber == carton.row1[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row1[3].editMode = false;
          carton.row1[3].selected = false;
          carton.row1[3].number =
            newNumber == 0 ? carton.row1[3].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row1[3].editMode = true;
        }
      }
      if (carton.row1[4].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row1[0].number ||
            newNumber == carton.row1[1].number ||
            newNumber == carton.row1[2].number ||
            newNumber == carton.row1[3].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row1[4].editMode = false;
          carton.row1[4].selected = false;
          carton.row1[4].number =
            newNumber == 0 ? carton.row1[4].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row1[4].editMode = true;
        }
      }
      this.items[carton.index] = carton;
    } else if (number <= 30) {
      if (carton.row2[0].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row2[1].number ||
            newNumber == carton.row2[2].number ||
            newNumber == carton.row2[3].number ||
            newNumber == carton.row2[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          if (newNumber > 30 || newNumber < 16) {
            alert('No se aceptan números menores de 16 ni mayores de 30');
            return;
          }
          carton.row2[0].editMode = false;
          carton.row2[0].selected = false;
          carton.row2[0].number =
            newNumber == 0 ? carton.row2[0].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row2[0].editMode = true;
        }
      }
      if (carton.row2[1].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row2[0].number ||
            newNumber == carton.row2[2].number ||
            newNumber == carton.row2[3].number ||
            newNumber == carton.row2[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row2[1].editMode = false;
          carton.row2[1].selected = false;
          carton.row2[1].number =
            newNumber == 0 ? carton.row2[1].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row2[1].editMode = true;
        }
      }
      if (carton.row2[2].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row2[0].number ||
            newNumber == carton.row2[1].number ||
            newNumber == carton.row2[3].number ||
            newNumber == carton.row2[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row2[2].editMode = false;
          carton.row2[2].selected = false;
          carton.row2[2].number =
            newNumber == 0 ? carton.row2[2].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row2[2].editMode = true;
        }
      }
      if (carton.row2[3].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row2[0].number ||
            newNumber == carton.row2[1].number ||
            newNumber == carton.row2[2].number ||
            newNumber == carton.row2[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row2[3].editMode = false;
          carton.row2[3].selected = false;
          carton.row2[3].number =
            newNumber == 0 ? carton.row2[3].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row2[3].editMode = true;
        }
      }
      if (carton.row2[4].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row2[0].number ||
            newNumber == carton.row2[1].number ||
            newNumber == carton.row2[2].number ||
            newNumber == carton.row2[3].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row2[4].editMode = false;
          carton.row2[4].selected = false;
          carton.row2[4].number =
            newNumber == 0 ? carton.row2[4].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row2[4].editMode = true;
        }
      }
      this.items[carton.index] = carton;
    } else if (number <= 45) {
      if (carton.row3[0].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row3[1].number ||
            newNumber == carton.row3[2].number ||
            newNumber == carton.row3[3].number ||
            newNumber == carton.row3[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          if (newNumber > 45 || newNumber < 31) {
            alert('No se aceptan números menores de 31 ni mayores de 45');
            return;
          }
          carton.row3[0].editMode = false;
          carton.row3[0].selected = false;
          carton.row3[0].number =
            newNumber == 0 ? carton.row3[0].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row3[0].editMode = true;
        }
      }
      if (carton.row3[1].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row3[0].number ||
            newNumber == carton.row3[2].number ||
            newNumber == carton.row3[3].number ||
            newNumber == carton.row3[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row3[1].editMode = false;
          carton.row3[1].selected = false;
          carton.row3[1].number =
            newNumber == 0 ? carton.row3[1].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row3[1].editMode = true;
        }
      }
      if (carton.row3[2].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row3[0].number ||
            newNumber == carton.row3[1].number ||
            newNumber == carton.row3[3].number ||
            newNumber == carton.row3[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row3[2].editMode = false;
          carton.row3[2].selected = false;
          carton.row3[2].number =
            newNumber == 0 ? carton.row3[2].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row3[2].editMode = true;
        }
      }
      if (carton.row3[3].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row3[0].number ||
            newNumber == carton.row3[1].number ||
            newNumber == carton.row3[2].number ||
            newNumber == carton.row3[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row3[3].editMode = false;
          carton.row3[3].selected = false;
          carton.row3[3].number =
            newNumber == 0 ? carton.row3[3].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row3[3].editMode = true;
        }
      }
      if (carton.row3[4].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row3[0].number ||
            newNumber == carton.row3[1].number ||
            newNumber == carton.row3[2].number ||
            newNumber == carton.row3[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row3[4].editMode = false;
          carton.row3[4].selected = false;
          carton.row3[4].number =
            newNumber == 0 ? carton.row3[4].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row3[4].editMode = true;
        }
      }
      this.items[carton.index] = carton;
    } else if (number <= 60) {
      if (carton.row4[0].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row4[1].number ||
            newNumber == carton.row4[2].number ||
            newNumber == carton.row4[3].number ||
            newNumber == carton.row4[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          if (newNumber > 60 || newNumber < 46) {
            alert('No se aceptan números menores de 46 ni mayores de 60');
            return;
          }
          carton.row4[0].editMode = false;
          carton.row4[0].selected = false;
          carton.row4[0].number =
            newNumber == 0 ? carton.row4[0].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row4[0].editMode = true;
        }
      }
      if (carton.row4[1].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row4[0].number ||
            newNumber == carton.row4[2].number ||
            newNumber == carton.row4[3].number ||
            newNumber == carton.row4[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row4[1].editMode = false;
          carton.row4[1].selected = false;
          carton.row4[1].number =
            newNumber == 0 ? carton.row4[1].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row4[1].editMode = true;
        }
      }
      if (carton.row4[2].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row4[0].number ||
            newNumber == carton.row4[1].number ||
            newNumber == carton.row4[3].number ||
            newNumber == carton.row4[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row4[2].editMode = false;
          carton.row4[2].selected = false;
          carton.row4[2].number =
            newNumber == 0 ? carton.row4[2].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row4[2].editMode = true;
        }
      }
      if (carton.row4[3].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row4[0].number ||
            newNumber == carton.row4[1].number ||
            newNumber == carton.row4[2].number ||
            newNumber == carton.row4[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row4[3].editMode = false;
          carton.row4[3].selected = false;
          carton.row4[3].number =
            newNumber == 0 ? carton.row4[3].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row4[3].editMode = true;
        }
      }
      if (carton.row4[4].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row4[0].number ||
            newNumber == carton.row4[1].number ||
            newNumber == carton.row4[2].number ||
            newNumber == carton.row4[3].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row4[4].editMode = false;
          carton.row4[4].selected = false;
          carton.row4[4].number =
            newNumber == 0 ? carton.row4[4].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row4[4].editMode = true;
        }
      }
      this.items[carton.index] = carton;
    } else if (number < 76) {
      if (carton.row5[0].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row5[1].number ||
            newNumber == carton.row5[2].number ||
            newNumber == carton.row5[3].number ||
            newNumber == carton.row5[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          if (newNumber > 75 || newNumber < 61) {
            alert('No se aceptan números menores de 61 ni mayores de 75');
            return;
          }
          carton.row5[0].editMode = false;
          carton.row5[0].selected = false;
          carton.row5[0].number =
            newNumber == 0 ? carton.row5[0].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row5[0].editMode = true;
        }
      }
      if (carton.row5[1].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row5[0].number ||
            newNumber == carton.row5[2].number ||
            newNumber == carton.row5[3].number ||
            newNumber == carton.row5[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row5[1].editMode = false;
          carton.row5[1].selected = false;
          carton.row5[1].number =
            newNumber == 0 ? carton.row5[1].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row5[1].editMode = true;
        }
      }
      if (carton.row5[2].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row5[0].number ||
            newNumber == carton.row5[1].number ||
            newNumber == carton.row5[3].number ||
            newNumber == carton.row5[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row5[2].editMode = false;
          carton.row5[2].selected = false;
          carton.row5[2].number =
            newNumber == 0 ? carton.row5[2].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row5[2].editMode = true;
        }
      }
      if (carton.row5[3].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row5[0].number ||
            newNumber == carton.row5[1].number ||
            newNumber == carton.row5[2].number ||
            newNumber == carton.row5[4].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row5[3].editMode = false;
          carton.row5[3].selected = false;
          carton.row5[3].number =
            newNumber == 0 ? carton.row5[3].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row5[3].editMode = true;
        }
      }
      if (carton.row5[4].number == number) {
        if (toSave) {
          if (
            newNumber == carton.row5[0].number ||
            newNumber == carton.row5[1].number ||
            newNumber == carton.row5[2].number ||
            newNumber == carton.row5[3].number
          ) {
            alert('El número ya existe en la columna');
            return;
          }
          carton.row5[4].editMode = false;
          carton.row5[4].selected = false;
          carton.row5[4].number =
            newNumber == 0 ? carton.row5[4].number : newNumber;
          this.newNumber = 0;
        } else {
          carton.row5[4].editMode = true;
        }
      }
      this.items[carton.index] = carton;
    } else {
      alert('El numero sobrepasa el límite establecido');
      return;
    }
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
    this._homeService.searchThroughLeftCartonToSetNumber(this.genericTable[0]);

    this.getPlayLaCosita(this.items);
    this.getPlayMedio(this.items);
    this.getPlaySumita(this.items);
    this.getPlayLetraT(this.items);
    this.getPlayBingoRegular(this.items);
    this.getPlay4Esquinas(this.items);
    this.getPlayX(this.items);
    this.getPlayLetraL(this.items);
    this.getPlayMediaC(this.items);
    this.getPlayCometa(this.items);
    this.getPlayWholeCarton(this.items);
  }

  genericTableLeft() {
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
    } as any;

    for (let i = 1; i < 76; i++) {
      if (i <= 15) {
        content.row1.push({ number: i, selected: false });
      } else if (i <= 30) {
        content.row2.push({ number: i, selected: false });
      } else if (i <= 45) {
        content.row3.push({ number: i, selected: false });
      } else if (i <= 60) {
        content.row4.push({ number: i, selected: false });
      } else if (i < 76) {
        content.row5.push({ number: i, selected: false });
      }
    }
    this.genericTable.push(content);
  }

  getPlayLaCosita(carton: any) {
    carton.forEach((c: any) => {
      if (
        (c.row1[0].selected && c.row2[0].selected) ||
        (c.row1[4].selected && c.row2[4].selected) ||
        (c.row4[0].selected && c.row5[0].selected) ||
        (c.row4[4].selected && c.row5[4].selected)
      ) {
        if (!c.row1.cosita) {
          c.row1.cosita = true;

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 210777,
                  jugador_id: c.row1.playerSelected,
                  monto: 25,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data: any) => {
                    console.log('Se creo winner - cosita');

                    const buildPlayWinner = {
                      jugada_id: 210777,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlayMedio(carton: any) {
    carton.forEach((c: any) => {
      if (
        (c.row1[2].selected && c.row5[2].selected) ||
        (c.row1[2].selected && c.row2[2].selected) ||
        (c.row4[2].selected && c.row5[2].selected) ||
        (c.row2[2].selected && c.row4[2].selected)
      ) {
        if (!c.row1.medio) {
          c.row1.medio = true;

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 693521,
                  jugador_id: c.row1.playerSelected,
                  monto: 25,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data: any) => {
                    console.log('Se creo winner - medio');

                    const buildPlayWinner = {
                      jugada_id: 693521,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlaySumita(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row2[2].selected &&
        c.row3[1].selected &&
        c.row3[3].selected &&
        c.row4[2].selected
      ) {
        if (!c.row1.sumita) {
          c.row1.sumita = true;
          c.row2[2].class = 'circle-sumita';
          c.row3[1].class = 'circle-sumita';
          c.row3[3].class = 'circle-sumita';
          c.row4[2].class = 'circle-sumita';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 174477,
                  jugador_id: c.row1.playerSelected,
                  monto: 25,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data: any) => {
                    console.log('Se creo winner - sumita');

                    const buildPlayWinner = {
                      jugada_id: 174477,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlayLetraT(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row1[0].selected &&
        c.row2[0].selected &&
        c.row3[0].selected &&
        c.row4[0].selected &&
        c.row5[0].selected &&
        c.row3[1].selected &&
        c.row3[3].selected &&
        c.row3[4].selected
      ) {
        if (!c.row1.letraT) {
          c.row1.letraT = true;
          c.row1[0].class = 'circle-t';
          c.row2[0].class = 'circle-t';
          c.row3[0].class = 'circle-t';
          c.row4[0].class = 'circle-t';
          c.row5[0].class = 'circle-t';
          c.row3[1].class = 'circle-t';
          c.row3[3].class = 'circle-t';
          c.row3[4].class = 'circle-t';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 669740,
                  jugador_id: c.row1.playerSelected,
                  monto: 30,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data: any) => {
                    console.log('Se creo winner - letra t');

                    const buildPlayWinner = {
                      jugada_id: 669740,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlayBingoRegular(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row1[0].selected &&
        c.row2[0].selected &&
        c.row3[0].selected &&
        c.row4[0].selected &&
        c.row5[0].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[0].class = 'circle-bingo';
          c.row2[0].class = 'circle-bingo';
          c.row3[0].class = 'circle-bingo';
          c.row4[0].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[0].selected &&
        c.row1[1].selected &&
        c.row1[2].selected &&
        c.row1[3].selected &&
        c.row1[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[0].class = 'circle-bingo';
          c.row1[1].class = 'circle-bingo';
          c.row1[2].class = 'circle-bingo';
          c.row1[3].class = 'circle-bingo';
          c.row1[4].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row2[0].selected &&
        c.row2[1].selected &&
        c.row2[2].selected &&
        c.row2[3].selected &&
        c.row2[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row2[0].class = 'circle-bingo';
          c.row2[1].class = 'circle-bingo';
          c.row2[2].class = 'circle-bingo';
          c.row2[3].class = 'circle-bingo';
          c.row2[4].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row3[0].selected &&
        c.row3[1].selected &&
        c.row3[3].selected &&
        c.row3[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[4].class = 'circle-bingo';
          c.row2[4].class = 'circle-bingo';
          c.row3[4].class = 'circle-bingo';
          c.row4[4].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row4[0].selected &&
        c.row4[1].selected &&
        c.row4[2].selected &&
        c.row4[3].selected &&
        c.row4[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row4[0].class = 'circle-bingo';
          c.row4[1].class = 'circle-bingo';
          c.row4[2].class = 'circle-bingo';
          c.row4[3].class = 'circle-bingo';
          c.row4[4].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row5[0].selected &&
        c.row5[1].selected &&
        c.row5[2].selected &&
        c.row5[3].selected &&
        c.row5[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row5[4].class = 'circle-bingo';
          c.row5[3].class = 'circle-bingo';
          c.row5[2].class = 'circle-bingo';
          c.row5[1].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[1].selected &&
        c.row2[1].selected &&
        c.row3[1].selected &&
        c.row4[1].selected &&
        c.row5[1].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[1].class = 'circle-bingo';
          c.row2[1].class = 'circle-bingo';
          c.row3[1].class = 'circle-bingo';
          c.row4[1].class = 'circle-bingo';
          c.row5[1].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[2].selected &&
        c.row2[2].selected &&
        c.row4[2].selected &&
        c.row5[2].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[2].class = 'circle-bingo';
          c.row2[2].class = 'circle-bingo';
          c.row4[2].class = 'circle-bingo';
          c.row5[2].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[3].selected &&
        c.row2[3].selected &&
        c.row3[3].selected &&
        c.row4[3].selected &&
        c.row5[3].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[3].class = 'circle-bingo';
          c.row2[3].class = 'circle-bingo';
          c.row3[3].class = 'circle-bingo';
          c.row4[3].class = 'circle-bingo';
          c.row5[3].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[4].selected &&
        c.row2[4].selected &&
        c.row3[4].selected &&
        c.row4[4].selected &&
        c.row5[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[4].class = 'circle-bingo';
          c.row2[4].class = 'circle-bingo';
          c.row3[4].class = 'circle-bingo';
          c.row4[4].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[0].selected &&
        c.row2[1].selected &&
        c.row4[3].selected &&
        c.row5[4].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[0].class = 'circle-bingo';
          c.row2[1].class = 'circle-bingo';
          c.row4[3].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }

      if (
        c.row1[4].selected &&
        c.row2[3].selected &&
        c.row4[1].selected &&
        c.row5[0].selected
      ) {
        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[4].class = 'circle-bingo';
          c.row2[3].class = 'circle-bingo';
          c.row3[1].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            this.createWinnerBingoRegular(c);
          }
        }
      }
    });
  }

  getPlay4Esquinas(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row1[0].selected &&
        c.row5[0].selected &&
        c.row1[4].selected &&
        c.row5[4].selected
      ) {
        if (!c.row1.esquinas) {
          c.row1.esquinas = true;
          c.row1[0].class = 'circle-bingo';
          c.row1[4].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 170564,
                  jugador_id: c.row1.playerSelected,
                  monto: 100,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data) => {
                    console.log('Se creo winner - cuatro esquinas');

                    const buildPlayWinner = {
                      jugada_id: 170564,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlayX(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row2[1].selected &&
        c.row2[3].selected &&
        c.row4[1].selected &&
        c.row4[3].selected
      ) {
        if (!c.row1.x) {
          c.row1.x = true;
          c.row2[1].class = 'circle-x';
          c.row2[3].class = 'circle-x';
          c.row4[1].class = 'circle-x';
          c.row4[3].class = 'circle-x';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 325808,
                  jugador_id: c.row1.playerSelected,
                  monto: 25,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data) => {
                    console.log('Se creo winner - x');

                    const buildPlayWinner = {
                      jugada_id: 325808,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlayLetraL(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row1[0].selected &&
        c.row1[1].selected &&
        c.row1[2].selected &&
        c.row1[3].selected &&
        c.row1[4].selected &&
        c.row2[4].selected &&
        c.row3[4].selected &&
        c.row4[4].selected &&
        c.row5[4].selected
      ) {
        if (!c.row1.l) {
          c.row1.l = true;
          c.row1[0].class = 'circle-l';
          c.row1[1].class = 'circle-l';
          c.row1[2].class = 'circle-l';
          c.row1[3].class = 'circle-l';
          c.row1[4].class = 'circle-l';
          c.row2[4].class = 'circle-l';
          c.row3[4].class = 'circle-l';
          c.row4[4].class = 'circle-l';
          c.row5[4].class = 'circle-l';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 232422,
                  jugador_id: c.row1.playerSelected,
                  monto: 25,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data) => {
                    console.log('Se creo winner - L');

                    const buildPlayWinner = {
                      jugada_id: 232422,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  getPlayMediaC(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row2[1].selected &&
        c.row2[2].selected &&
        c.row2[3].selected &&
        c.row3[1].selected &&
        c.row3[3].selected
      ) {
        if (!c.row1.mediaC) {
          c.row1.mediaC = true;
          alert('Media C');
        }
      }
    });
  }

  getPlayCometa(carton: any) {
    carton.forEach((c: any) => {
      if (
        c.row1[0].selected &&
        c.row2[0].selected &&
        c.row1[1].selected &&
        c.row2[1].selected &&
        c.row4[3].selected &&
        c.row5[4].selected
      ) {
        if (!c.row1.cometa) {
          c.row1.cometa = true;
          alert('Cometa');
        }
      }
    });
  }

  getPlayWholeCarton(carton: any) {
    carton.forEach((c: any) => {
      const isRow1Whole = c.row1.every((x: any) => x.selected === true);
      const isRow2Whole = c.row2.every((x: any) => x.selected === true);
      const isRow3Whole = c.row3.every((x: any) => x.selected === true);
      const isRow4Whole = c.row4.every((x: any) => x.selected === true);
      const isRow5Whole = c.row5.every((x: any) => x.selected === true);

      if (
        isRow1Whole &&
        isRow2Whole &&
        isRow3Whole &&
        isRow4Whole &&
        isRow5Whole
      ) {
        if (!c.row1.lleno) {
          c.row1.lleno = true;

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
            let playerName;
            this._playerService
              .getPlayer(c.row1.playerSelected)
              .subscribe((data) => {
                playerName = data.listById.name;

                const buildWinner = {
                  name: playerName,
                  jugada_id: 263903,
                  jugador_id: c.row1.playerSelected,
                  monto: 30,
                };

                this._winnerService.createWinner(buildWinner).subscribe(
                  (data) => {
                    console.log('Se creo winner - lleno');

                    const buildPlayWinner = {
                      jugada_id: 263903,
                      jugador_id: c.row1.playerSelected,
                    };

                    this._playWinnerService
                      .createPlayWinner(buildPlayWinner)
                      .subscribe(
                        (data) => {
                          console.log('Se creo play-winner');
                        },
                        (err) => {
                          console.log(err);
                        }
                      );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
          }
        }
      }
    });
  }

  createWinnerBingoRegular(c: any) {
    let playerName;
    this._playerService.getPlayer(c.row1.playerSelected).subscribe((data) => {
      playerName = data.listById.name;

      const buildWinner = {
        name: playerName,
        jugada_id: 731245,
        jugador_id: c.row1.playerSelected,
        monto: 80,
      };

      this._winnerService.createWinner(buildWinner).subscribe(
        (data) => {
          console.log('Se creo winner - bingo regular');

          const buildPlayWinner = {
            jugada_id: 731245,
            jugador_id: c.row1.playerSelected,
          };

          this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(
            (data) => {
              console.log('Se creo play-winner');
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
