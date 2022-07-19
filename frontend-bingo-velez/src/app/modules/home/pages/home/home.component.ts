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
      partida: ['', Validators.required]
    })
   }

  ngOnInit(): void {

    this.getPartidas();

    this._settingsService.getAllSettings().subscribe((setting: any) => {
      setting.settings.forEach((s: any) => {

        if (s.name.toLowerCase() === 'cartones') {
          this.items = this._homeService.items(
            s.value ? Number(s.value) : 30, CardBoard.Default 
          );
        }

      })
    })

    this._playerService.getPlayers().subscribe((data) => {
      this.players = data.list;
    });

    this.genericTableLeft();

    localStorage.removeItem('RandomNumber');
  }

  getPartidas() {
    this._settingsService.getPartidas().subscribe(data => {
      this.partidas = data.list;
    })
  }

  selectPlayer(carton: any, event: any) {
    carton.row1.isPlayerSelected = true;
    carton.row1.playerSelected = Number(event.target.value);
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



  getPlayLaCosita(carton: any) {
    carton.forEach((c: any) => {

      if (
        (c.row1[0].selected && c.row2[0].selected)
        || (c.row1[4].selected && c.row2[4].selected)
        || (c.row4[0].selected && c.row5[0].selected)
        || (c.row4[4].selected && c.row5[4].selected)
      ) {
        if (!c.row1.cosita) {
          c.row1.cosita = true;

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 210777,
                jugador_id: c.row1.playerSelected,
                monto: 25
              }

              this._winnerService.createWinner(buildWinner).subscribe((data: any) => {

                console.log('Se creo winner - cosita');

                const buildPlayWinner = {
                  jugada_id: 210777,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, (err: any) => {
                console.log(err)
              })
            })

          }

        }
      }

    });
  }

  getPlayMedio(carton: any) {
    carton.forEach((c: any) => {

      if (
        (c.row1[2].selected && c.row5[2].selected)
        || (c.row1[2].selected && c.row2[2].selected)
        || (c.row4[2].selected && c.row5[2].selected)
        || (c.row2[2].selected && c.row4[2].selected)
      ) {

        if (!c.row1.medio) {
          c.row1.medio = true;

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 693521,
                jugador_id: c.row1.playerSelected,
                monto: 25
              }

              this._winnerService.createWinner(buildWinner).subscribe((data: any) => {

                console.log('Se creo winner - medio');

                const buildPlayWinner = {
                  jugada_id: 693521,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, (err: any) => {
                console.log(err)
              })
            })

          }
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

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 174477,
                jugador_id: c.row1.playerSelected,
                monto: 25
              }

              this._winnerService.createWinner(buildWinner).subscribe((data: any) => {

                console.log('Se creo winner - sumita');

                const buildPlayWinner = {
                  jugada_id: 174477,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, (err: any) => {
                console.log(err)
              })
            })

          }
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

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 669740,
                jugador_id: c.row1.playerSelected,
                monto: 30
              }

              this._winnerService.createWinner(buildWinner).subscribe((data: any) => {

                console.log('Se creo winner - letra t');

                const buildPlayWinner = {
                  jugada_id: 669740,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, (err: any) => {
                console.log(err)
              })
            })

          }
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
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
            c.row2[4].class = 'circle-bingo';
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
          }
      }

      if (c.row3[0].selected && c.row3[1].selected
        && c.row3[3].selected && c.row3[4].selected) {
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
          }
      }


      if (c.row5[0].selected && c.row5[1].selected
        && c.row5[2].selected && c.row5[3].selected
        && c.row5[4].selected) {
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
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
  
            if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {
  
              this.createWinnerBingoRegular(c);
  
            }
          }
      }

      if (c.row1[4].selected && c.row2[3].selected
        && c.row4[1].selected
        && c.row5[0].selected
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
      if (c.row1[0].selected && c.row5[0].selected
        && c.row1[4].selected && c.row5[4].selected) {

        if (!c.row1.esquinas) {
          c.row1.esquinas = true;
          c.row1[0].class = 'circle-bingo';
          c.row1[4].class = 'circle-bingo';
          c.row5[4].class = 'circle-bingo';
          c.row5[0].class = 'circle-bingo';

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 170564,
                jugador_id: c.row1.playerSelected,
                monto: 100
              }

              this._winnerService.createWinner(buildWinner).subscribe(data => {

                console.log('Se creo winner - cuatro esquinas');

                const buildPlayWinner = {
                  jugada_id: 170564,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, err => {
                console.log(err)
              })
            })

          }
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

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 325808,
                jugador_id: c.row1.playerSelected,
                monto: 25
              }

              this._winnerService.createWinner(buildWinner).subscribe(data => {

                console.log('Se creo winner - x');

                const buildPlayWinner = {
                  jugada_id: 325808,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, err => {
                console.log(err)
              })
            })

          }
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
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 232422,
                jugador_id: c.row1.playerSelected,
                monto: 25
              }

              this._winnerService.createWinner(buildWinner).subscribe(data => {

                console.log('Se creo winner - L');

                const buildPlayWinner = {
                  jugada_id: 232422,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, err => {
                console.log(err)
              })
            })

          }
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

          if (c.row1.isPlayerSelected && c.row1.playerSelected != null) {

            let playerName;
            this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
              playerName = data.listById.name;

              const buildWinner = {
                name: playerName,
                jugada_id: 263903,
                jugador_id: c.row1.playerSelected,
                monto: 30
              }

              this._winnerService.createWinner(buildWinner).subscribe(data => {

                console.log('Se creo winner - lleno');

                const buildPlayWinner = {
                  jugada_id: 263903,
                  jugador_id: c.row1.playerSelected,
                }

                this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
                  console.log('Se creo play-winner');
                }, err => {
                  console.log(err);
                });


              }, err => {
                console.log(err)
              })
            })

          }
        }
      }
    })

  }


  createWinnerBingoRegular(c: any) {
    let playerName;
    this._playerService.getPlayer(c.row1.playerSelected).subscribe(data => {
      playerName = data.listById.name;

      const buildWinner = {
        name: playerName,
        jugada_id: 731245,
        jugador_id: c.row1.playerSelected,
        monto: 80
      }

      this._winnerService.createWinner(buildWinner).subscribe(data => {

        console.log('Se creo winner - bingo regular');

        const buildPlayWinner = {
          jugada_id: 731245,
          jugador_id: c.row1.playerSelected,
        }

        this._playWinnerService.createPlayWinner(buildPlayWinner).subscribe(data => {
          console.log('Se creo play-winner');
        }, err => {
          console.log(err);
        });


      }, err => {
        console.log(err)
      })
    })
  }
}



