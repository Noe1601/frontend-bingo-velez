import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { CardBoard } from 'src/app/modules/enums/cardboard.enum';
import { ImagesService } from 'src/app/core/services/images.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import Swal from 'sweetalert2';
import { PlayersService } from 'src/app/core/services/players.service';
import { CreatePlayerComponent } from 'src/app/core/components/create-player/create-player.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignJugadasComponent } from 'src/app/core/components/assign-jugadas/assign-jugadas.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  formPartidas: FormGroup;
  formJugadoresPartidas: FormGroup;
  quantity: number = 0;
  value: any;
  cartonesIdSettings: any;
  priceIdSettings: any;
  priceValue: any;
  settings: any;
  cartonesSpecials: FormGroup;
  canShowValueField: boolean = false;
  image: any;
  partidas: any;
  isToUpdate: boolean = false;
  idPartida: any;
  players: any;

  constructor(private _fb: FormBuilder,
    private _settingsService: SettingsService,
    private _playerService: PlayersService,
    private _dialog: MatDialog) {

    this._settingsService.getAllSettings().subscribe(setting => {

      this.settings = setting.settings.filter((s: any) =>
        s.name.toLowerCase() !== 'precio' &&
        s.name.toLowerCase() !== 'cartones'
      );

      setting.settings.forEach((s: any) => {

        if (s.name.toLowerCase() === 'cartones') {
          this.value = s.value;
          this.cartonesIdSettings = s.id;

          this.form.patchValue({
            cartonesNo: this.value
          });
        }

        if (s.name.toLowerCase() === 'precio') {
          this.priceValue = s.value;
          this.priceIdSettings = s.id;

          this.form2.patchValue({
            priceValue: this.priceValue
          });
        }

      })
    })

    this.form = this._fb.group({
      cartonesNo: ['', Validators.required]
    });

    this.form2 = this._fb.group({
      priceValue: ['', Validators.required]
    });

    this.cartonesSpecials = this._fb.group({
      option: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.formPartidas = this._fb.group({
      name: ['', Validators.required],
      precio: ['', Validators.required]
    });

    this.formJugadoresPartidas = this._fb.group({
      partida_id: ['', Validators.required],
      jugador_id: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getPartidas();
    this.getPlayers();
  }

  updateSettings(option: string) {

    switch (option) {

      case 'cardboard':
        const { cartonesNo } = this.form.value;
        this._settingsService.updateSettings(this.cartonesIdSettings, { value: cartonesNo }).subscribe(data => {
          Swal.fire('Cantidad cartones', `Se actualizo la cantidad de cartones`, 'success');
        }, err => {
          Swal.fire('Cantidad cartones', 'Ocurrio un error en la actualizacion de los cartones', 'error');
        })
        break;

      case 'price':
        const { priceValue } = this.form2.value;
        this._settingsService.updateSettings(this.priceIdSettings, { value: priceValue }).subscribe(data => {
          Swal.fire('Precio por partida', `Se actualizo el monto por partida`, 'success');
        }, err => {
          Swal.fire('Precio por partida', 'Ocurrio un error en la actualizacion del monto por partida', 'error');
        })
        break;

      case 'specialCardboard':
        const { option, value } = this.cartonesSpecials.value;
        this._settingsService.updateSettings(option, { value }).subscribe(data => {
          this.canShowValueField = false;
          Swal.fire('Cantidad cartones especiales', `Se actualizo la cantidad de cartones especiales`, 'success');
        }, err => {
          Swal.fire('Cantidad cartones especiales', 'Ocurrio un error en la actualizacion de los cartones', 'error');
        })
        break;

      default:
        break;
    }
  }

  changeSettingSelection() {
    const { option } = this.cartonesSpecials.value;
    this._settingsService.getSettingById(option).subscribe(setting => {
      this.canShowValueField = true;
      this.cartonesSpecials.patchValue({
        value: setting.settings.value
      });
    })
  }

  setToUpdate(value: any) {
    this.isToUpdate = true;
    this.idPartida = value.id;

    this.formPartidas.patchValue({
      name: value.name,
      precio: value.precio
    })
  }

  createPartida() {
    const request = {
      ...this.formPartidas.value,
      state: true
    }

    if (!this.isToUpdate) {
      this._settingsService.createPartida(request).subscribe(data => {
        Swal.fire('Creacion de partida', 'Se creo la partida exitosamente.', 'success');
        this.formPartidas.reset();
        this.getPartidas();
      }, err => {
        Swal.fire('Creacion de partida', 'Hubo un error en la creacion de la partida.', 'error')
      })
    }
    else {
      this.updatePartida(this.idPartida);
    }

  }

  getPartidas() {
    this._settingsService.getPartidas().subscribe(data => {
      this.partidas = data.list;
    })
  }

  updatePartida(id: any) {

    const request = {
      ...this.formPartidas.value
    }

    this._settingsService.updatePartida(request, id).subscribe(data => {
      Swal.fire('Actualizacion de partida', 'Se actualizo la partida.', 'success');
      this.formPartidas.reset();
      this.isToUpdate = false;
      this.idPartida = null;
      this.getPartidas();
    }, err => {
      Swal.fire('Actualizacion de partida', 'Hubo un error en la actualizacion de la partida.', 'error');
    })
  }


  getPlayers() {
    this._playerService.getPlayers().subscribe(data => {
      this.players = data.list;
    });
  }


  createJugadorPartida() {

    const { jugador_id, partida_id } = this.formJugadoresPartidas.value;

    jugador_id.forEach((j: any, index: number) => {

      const request = {
        jugador_id: j,
        partida_id
      }

      this._settingsService.createJugadorPartida(request).subscribe(data => {
        
        if( index + 1 === jugador_id.length ){
          Swal.fire('Agregando jugadores en partida', `Se agregaron ${ index + 1 } a esta partida.`, 'success');
          this.formJugadoresPartidas.reset();
        }

      }, err => {
        Swal.fire('Agregando jugador en partida', err.message, 'error');
      })
    })


  }

    openCreatePlayerDialog(){
      this._dialog.open(CreatePlayerComponent, {
        width: '500px'
      })
    }

    openJugadasDetail(partida: any){
      this._dialog.open(AssignJugadasComponent, {
        width: '600px',
        data: { partida }
      })
    }

}
