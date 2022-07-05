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
    //this.getPlayLaCosita(this.items);
    //this.getPlayMedio(this.items);
    //this.getPlaySumita(this.items);
    //this.getPlayLetraT(this.items);
    //this.getPlayBingoRegular(this.items);
    //this.getPlay4Esquinas(this.items);
    //this.getPlayX(this.items);
    this.getPlayWholeCarton(this.items);
    //this.getPlayLetraL(this.items);
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
        console.log('La cosita')
      }

      if (c.row1[4].selected && c.row2[4].selected) {
        console.log('La cosita')
      }

      if (c.row4[0].selected && c.row5[0].selected) {
        console.log('La cosita')
      }

      if (c.row4[4].selected && c.row5[4].selected) {
        console.log('La cosita')
      }

    })
  }

  getPlayMedio(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[2].selected && c.row5[2].selected) {
        alert('El medio')
      }

      if (c.row1[2].selected && c.row2[2].selected) {
        alert('El medio')
      }

      if (c.row4[2].selected && c.row5[2].selected) {
        alert('El medio')
      }

      if (c.row2[2].selected && c.row4[2].selected) {
        alert('El medio')
      }

    })
  }

  getPlaySumita(carton: any) {
    carton.forEach((c: any) => {

      if (c.row2[2].selected && c.row3[1].selected
        && c.row3[3].selected && c.row4[2].selected) {
        alert('Sumita')
      }

    })
  }

  getPlayLetraT(carton: any) {
    carton.forEach((c: any) => {
      if (c.row1[0].selected && c.row2[0].selected
        && c.row3[0].selected && c.row4[0].selected
        && c.row5[0].selected && c.row3[1].selected
        && c.row3[3].selected && c.row3[4].selected) {
        alert('Letra T')
      }

    })
  }

  getPlayBingoRegular(carton: any) {
    carton.forEach((c: any) => {

      if (c.row1[0].selected && c.row2[0].selected
        && c.row3[0].selected && c.row4[0].selected
        && c.row5[0].selected) {
        alert('Bingo regular')
      }

      if (c.row1[0].selected && c.row1[1].selected
        && c.row1[2].selected && c.row1[3].selected
        && c.row1[4].selected) {
        alert('Bingo regular')
      }

      if (c.row2[0].selected && c.row2[1].selected
        && c.row2[2].selected && c.row2[3].selected
        && c.row2[4].selected) {
        alert('Bingo regular')
      }

      if (c.row3[0].selected && c.row3[1].selected
        && c.row3[3].selected && c.row3[4].selected) {
        alert('Bingo regular')
      }

      if (c.row4[0].selected && c.row4[1].selected
        && c.row4[2].selected && c.row4[3].selected
        && c.row4[4].selected) {
        alert('Bingo regular')
      }

      if (c.row5[0].selected && c.row5[1].selected
        && c.row5[2].selected && c.row5[3].selected
        && c.row5[4].selected) {
        alert('Bingo regular')
      }

      if (c.row1[0].selected && c.row2[0].selected
        && c.row3[0].selected && c.row4[0].selected
        && c.row5[0].selected) {
        alert('Bingo regular')
      }

      if (c.row1[0].selected && c.row2[0].selected
        && c.row3[0].selected && c.row4[0].selected
        && c.row5[0].selected) {
        alert('Bingo regular')
      }

      if (c.row1[1].selected && c.row2[1].selected
        && c.row3[1].selected && c.row4[1].selected
        && c.row5[1].selected) {
        alert('Bingo regular')
      }

      if (c.row1[2].selected && c.row2[2].selected
        && c.row4[2].selected
        && c.row5[2].selected) {
        alert('Bingo regular')
      }

      if (c.row1[3].selected && c.row2[3].selected
        && c.row3[3].selected && c.row4[3].selected
        && c.row5[3].selected) {
        alert('Bingo regular')
      }

      if (c.row1[4].selected && c.row2[4].selected
        && c.row3[4].selected && c.row4[4].selected
        && c.row5[4].selected) {
        alert('Bingo regular')
      }

      if (c.row1[0].selected && c.row2[1].selected
        && c.row4[3].selected
        && c.row5[4].selected) {
        alert('Bingo regular')
      }

      if (c.row1[4].selected && c.row2[3].selected
        && c.row4[1].selected
        && c.row5[0].selected) {
        alert('Bingo regular')
      }

    });
  }

  getPlay4Esquinas(carton: any) {
    carton.forEach((c: any) => {
      if(c.row1[0].selected && c.row5[0].selected
        && c.row1[4].selected && c.row5[4].selected){
          alert('4 esquinas');
        }
    })
  }

  getPlayX(carton: any) {
    carton.forEach((c: any) => {

      if(c.row2[1].selected && c.row2[3].selected
        && c.row4[1].selected && c.row4[3].selected){
          alert('X');
        }

    });
  }

  getPlayWholeCarton(carton: any) {
    const isWhole = carton.every((c: any) => c.selected === true );
    if(isWhole){
      alert('Carton lleno');
    }
  }

  getPlayLetraL(carton: any) {
    carton.forEach((c: any) => {
      if(c.row1[0].selected && c.row1[1].selected
        && c.row1[2].selected && c.row1[3].selected
        && c.row1[4].selected && c.row2[4].selected
        && c.row3[4].selected && c.row4[4].selected
        && c.row5[4].selected){
          alert('Letra L');
        }
    })
  }
  
}
