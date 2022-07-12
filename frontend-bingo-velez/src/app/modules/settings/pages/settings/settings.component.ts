import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';
import { CardBoard } from 'src/app/modules/enums/cardboard.enum';
import { ImagesService } from 'src/app/core/services/images.service';
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
  settings: any;
  cartonesSpecials: FormGroup;
  canShowValueField: boolean = false;
  image: any;

  constructor(private _fb: FormBuilder,
    private _settingsService: SettingsService,
    private _imageService: ImagesService) {

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
  }

  ngOnInit(): void {
    this._imageService.getImages().subscribe(image => {
     image.filesObject.forEach((x: any) => {
      
     });

    })
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

}
