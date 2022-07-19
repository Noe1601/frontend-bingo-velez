import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/core/services/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartones',
  templateUrl: './cartones.component.html',
  styleUrls: ['./cartones.component.scss']
})
export class CartonesComponent implements OnInit {

  form: FormGroup;
  cartonesIdSettings: any;
  settings: any;
  value: any;
  
  constructor(private _fb: FormBuilder,
    private _settingsService: SettingsService
    ) { 

    this.form = this._fb.group({
      cartonesNo: ['', Validators.required]
    });
    
  }

  ngOnInit(): void {
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

      })
    })
  }

  updateSettings(option: string) {
        const { cartonesNo } = this.form.value;
        this._settingsService.updateSettings(this.cartonesIdSettings, { value: cartonesNo }).subscribe(data => {
          Swal.fire('Cantidad cartones', `Se actualizo la cantidad de cartones`, 'success');
        }, err => {
          Swal.fire('Cantidad cartones', 'Ocurrio un error en la actualizacion de los cartones', 'error');
        })
    
  }

}
