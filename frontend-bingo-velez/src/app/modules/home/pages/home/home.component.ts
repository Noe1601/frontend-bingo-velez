import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';
import { PlayersService } from 'src/app/core/services/players.service';
import { SettingsService } from 'src/app/core/services/settings.service';

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

  constructor(
    private _homeService: HomeService,
    private _playerService: PlayersService,
    private _settingsService: SettingsService
  ) { }

  ngOnInit(): void {

    this._settingsService.getAllSettings().subscribe(setting => {
      setting.settings.forEach((s: any) => {

        if (s.name.toLowerCase() === 'cartones') {
          this.items = this._homeService.items(
            s.value ? Number(s.value) : 30
          );
        }

      })
    })

    this._playerService.getPlayers().subscribe((data) => {
      this.players = data.list;
    });

    localStorage.removeItem('RandomNumber');
  }

  resetCarton(carton: any) {
    var newCarton = this._homeService.newCarton(1);

    for (var key in newCarton) {
      var value = newCarton[key];
      value.index = carton.index;
      this.items[carton.index] = value;
    }
  }

  setColorToCellNumber() {
    this.randomNumber = this._homeService.getRandomInt(1, 75);
    this.lastFivePlays(this.randomNumber);
    localStorage.setItem('RandomNumber', String(this.randomNumber));
    const newItems = this._homeService.searchThroughCartonesToSetNumber(
      this.items
    );
    this.items = newItems;
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

  lastFivePlays(play: number) {
    if (this.numbers.length == 5) {
      this.numbers.pop();
      this.numbers.unshift(play);
      this.numbers.join(' ');
      return;
    }
    this.numbers.unshift(play);
  }

  getPlayLaCosita(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[0].selected && c.row2[0].selected) {
        if (!c.row1.cosita) {
          c.row1.cosita = true;
          alert('La cosita')
        }
      }

      if (c.row1[4].selected && c.row2[4].selected) {
        if (!c.row1.cosita) {
          c.row1.cosita = true;
          alert('La cosita')
        }
      }

      if (c.row4[0].selected && c.row5[0].selected) {
        if (!c.row1.cosita) {
          c.row1.cosita = true;
          alert('La cosita')
        }
      }

      if (c.row4[4].selected && c.row5[4].selected) {
        if (!c.row1.cosita) {
          c.row1.cosita = true;
          alert('La cosita')
        }
      }

    });
  }

  getPlayMedio(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[2].selected && c.row5[2].selected) {
        if (!c.row1.medio) {
          c.row1.medio = true;
          alert('El medio')
        }
      }

      if (c.row1[2].selected && c.row2[2].selected) {
        if (!c.row1.medio) {
          c.row1.medio = true;
          alert('El medio')
        }
      }

      if (c.row4[2].selected && c.row5[2].selected) {
        if (!c.row1.medio) {
          c.row1.medio = true;
          alert('El medio')
        }
      }

      if (c.row2[2].selected && c.row4[2].selected) {
        if (!c.row1.medio) {
          c.row1.medio = true;
          alert('El medio')
        }
      }

    });
  }

  getPlaySumita(carton: any) {
    carton.forEach((c: any) => {

      if (c.row2[2].selected && c.row3[1].selected
        && c.row3[3].selected && c.row4[2].selected) {
        if (!c.row1.sumita) {
          c.row1.sumita = true;
          c.row2[2].class = 'circle-sumita';
          c.row3[1].class = 'circle-sumita';
          c.row3[3].class = 'circle-sumita';
          c.row4[2].class = 'circle-sumita';
        }
      }
    });
  }

  getPlayLetraT(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[0].selected && c.row2[0].selected
        && c.row3[0].selected && c.row4[0].selected
        && c.row5[0].selected && c.row3[1].selected
        && c.row3[3].selected && c.row3[4].selected) {

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
        }
      }
    });
  }

  getPlayBingoRegular(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[0].selected && c.row2[0].selected
        && c.row3[0].selected && c.row4[0].selected
        && c.row5[0].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[0].class = 'circle-bingo';
          c.row2[0].class = 'circle-bingo';
          c.row3[0].class = 'circle-bingo';
          c.row4[0].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';
        }
      }

      if (c.row1[0].selected && c.row1[1].selected
        && c.row1[2].selected && c.row1[3].selected
        && c.row1[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[0].class = 'circle-bingo';
          c.row1[1].class = 'circle-bingo';
          c.row1[2].class = 'circle-bingo';
          c.row1[3].class = 'circle-bingo';
          c.row1[4].class = 'circle-bingo';
        }
      }

      if (c.row2[0].selected && c.row2[1].selected
        && c.row2[2].selected && c.row2[3].selected
        && c.row2[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row2[0].class = 'circle-bingo';
          c.row2[1].class = 'circle-bingo';
          c.row2[2].class = 'circle-bingo';
          c.row2[3].class = 'circle-bingo';
          c.row2[5].class = 'circle-bingo';
        }
      }

      if (c.row3[0].selected && c.row3[1].selected
        && c.row3[3].selected && c.row3[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row3[0].class = 'circle-bingo';
          c.row3[1].class = 'circle-bingo';
          c.row3[3].class = 'circle-bingo';
          c.row3[4].class = 'circle-bingo';
        }
      }

      if (c.row4[0].selected && c.row4[1].selected
        && c.row4[2].selected && c.row4[3].selected
        && c.row4[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row4[0].class = 'circle-bingo';
          c.row4[1].class = 'circle-bingo';
          c.row4[2].class = 'circle-bingo';
          c.row4[3].class = 'circle-bingo';
          c.row4[4].class = 'circle-bingo';
        }
      }

      if (c.row5[0].selected && c.row5[1].selected
        && c.row5[2].selected && c.row5[3].selected
        && c.row5[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row5[0].class = 'circle-bingo';
          c.row5[1].class = 'circle-bingo';
          c.row5[2].class = 'circle-bingo';
          c.row5[3].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';
        }
      }

      // if (c.row1[0].selected && c.row2[0].selected
      //   && c.row3[0].selected && c.row4[0].selected
      //   && c.row5[0].selected) {

      //   if (!c.row1.regular) {
      //     c.row1.regular = true;
      //     c.row1[0].class = 'circle-bingo';
      //     c.row2[0].class = 'circle-bingo';
      //     c.row3[0].class = 'circle-bingo';
      //     c.row4[0].class = 'circle-bingo';
      //     c.row5[0].class = 'circle-bingo';
      //   }
      // }

      // if (c.row1[0].selected && c.row2[0].selected
      //   && c.row3[0].selected && c.row4[0].selected
      //   && c.row5[0].selected) {

      //   if (!c.row1.regular) {
      //     c.row1.regular = true;
      //     alert('Bingo regular')
      //   }
      // }

      if (c.row1[1].selected && c.row2[1].selected
        && c.row3[1].selected && c.row4[1].selected
        && c.row5[1].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[1].class = 'circle-bingo';
          c.row2[1].class = 'circle-bingo';
          c.row3[1].class = 'circle-bingo';
          c.row4[1].class = 'circle-bingo';
          c.row5[1].class = 'circle-bingo';
        }
      }

      if (c.row1[2].selected && c.row2[2].selected
        && c.row4[2].selected
        && c.row5[2].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[2].class = 'circle-bingo';
          c.row2[2].class = 'circle-bingo';
          c.row4[2].class = 'circle-bingo';
          c.row5[2].class = 'circle-bingo';
        }
      }

      if (c.row1[3].selected && c.row2[3].selected
        && c.row3[3].selected && c.row4[3].selected
        && c.row5[3].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[3].class = 'circle-bingo';
          c.row2[3].class = 'circle-bingo';
          c.row3[3].class = 'circle-bingo';
          c.row4[3].class = 'circle-bingo';
          c.row5[3].class = 'circle-bingo';
        }
      }

      if (c.row1[4].selected && c.row2[4].selected
        && c.row3[4].selected && c.row4[4].selected
        && c.row5[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[4].class = 'circle-bingo';
          c.row2[4].class = 'circle-bingo';
          c.row3[4].class = 'circle-bingo';
          c.row4[4].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';
        }
      }

      if (c.row1[0].selected && c.row2[1].selected
        && c.row4[3].selected
        && c.row5[4].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[0].class = 'circle-bingo';
          c.row2[1].class = 'circle-bingo';
          c.row4[3].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';
        }
      }

      if (c.row1[4].selected && c.row2[3].selected
        && c.row4[1].selected
        && c.row5[0].selected) {

        if (!c.row1.regular) {
          c.row1.regular = true;
          c.row1[4].class = 'circle-bingo';
          c.row2[3].class = 'circle-bingo';
          c.row4[1].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';
        }
      }

    });
  }

  getPlay4Esquinas(carton: any) {
    carton.forEach((c: any) => {
      if (c.row1[0].selected && c.row5[0].selected
        && c.row1[4].selected && c.row5[4].selected) {

        if (!c.row1.esquinas) {
          c.row1.esquinas = true;
          c.row1[0].class = 'circle-bingo';
          c.row1[4].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';
        }
      }
    })
  }

  getPlayX(carton: any) {
    carton.forEach((c: any) => {

      if (c.row2[1].selected && c.row2[3].selected
        && c.row4[1].selected && c.row4[3].selected) {

        if (!c.row1.x) {
          c.row1.x = true;
          c.row2[1].class = 'circle-x';
          c.row2[3].class = 'circle-x';
          c.row4[1].class = 'circle-x';
          c.row4[3].class = 'circle-x';
        }
      }

    });
  }

  getPlayLetraL(carton: any) {
    carton.forEach((c: any) => {
      if (c.row1[0].selected && c.row1[1].selected
        && c.row1[2].selected && c.row1[3].selected
        && c.row1[4].selected && c.row2[4].selected
        && c.row3[4].selected && c.row4[4].selected
        && c.row5[4].selected) {

        if (!c.row1.l) {
          c.row.l = true;
          c.row1[0].class = 'circle-l';
          c.row1[1].class = 'circle-l';
          c.row1[2].class = 'circle-l';
          c.row1[3].class = 'circle-l';
          c.row1[4].class = 'circle-l';
          c.row2[4].class = 'circle-l';
          c.row3[4].class = 'circle-l';
          c.row4[4].class = 'circle-l';
          c.row5[4].class = 'circle-l';
        }
      }
    })
  }

  getPlayMediaC(carton: any) {
    carton.forEach((c: any) => {

      if (c.row2[1].selected && c.row2[2].selected
        && c.row2[3].selected && c.row3[1].selected
        && c.row3[3].selected) {

        if (!c.row1.mediaC) {
          c.row1.mediaC = true;
          alert('Media C')
        }
      }

    });
  }

  getPlayCometa(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[0].selected && c.row2[0].selected
        && c.row1[1].selected && c.row2[1].selected
        && c.row4[3].selected && c.row5[4].selected) {

        if (!c.row1.cometa) {
          c.row1.cometa = true;
          alert('Cometa')
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

      if (isRow1Whole && isRow2Whole && isRow3Whole
        && isRow4Whole && isRow5Whole) {
        if (!c.row1.lleno) {
          c.row1.lleno = true;
          alert('Carton lleno');
        }
      }
    })

  }
}
