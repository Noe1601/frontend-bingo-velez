import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/core/services/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  quantity: number = 0;
  value: any;
  cartonesIdSettings: any;
  priceIdSettings: any;
  priceValue: any;

  constructor(private _fb: FormBuilder,
    private _settingsService: SettingsService) {

    this._settingsService.getAllSettings().subscribe(setting => {
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
  }

  ngOnInit(): void { }

  updateSettings() {
    const { cartonesNo } = this.form.value;
    this._settingsService.updateSettings(this.cartonesIdSettings, { value: cartonesNo }).subscribe(data => {
      Swal.fire('Cantidad cartones', `Se actualizo la cantidad de cartones a ${data.value}`, 'success');
    }, err => {
      Swal.fire('Cantidad cartones', 'Ocurrio un error en la actualizacion de los cartones', 'error');
    })
  }

  updatePriceSettings(){
    const { priceValue } = this.form2.value;
    this._settingsService.updateSettings(this.priceIdSettings, { value: priceValue }).subscribe(data => {
      Swal.fire('Precio por partida', `Se actualizo el monto por partida: ${data.value}`, 'success');
    }, err => {
      Swal.fire('Precio por partida', 'Ocurrio un error en la actualizacion del monto por partida', 'error');
    })
  }

}
