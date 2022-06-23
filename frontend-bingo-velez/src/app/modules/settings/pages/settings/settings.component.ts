import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  switch: boolean = false;
  form: FormGroup;
  quantity: number = 0;

  constructor(private _homeService: HomeService, private _fb: FormBuilder) {
    this.form = this._fb.group({
      switch: [this.switch, Validators.required],
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('SwitchState') === "true"){
      this.form.setValue({
        switch: true
      })
    }
  }


  setCartonesQuantity() {
    this.switch = !this.form.value.switch;

    localStorage.setItem("SwitchState", this.switch as any);
    
    if (this.form.value.switch) {
      this.quantity = 21;
    }
    else{
      this.quantity = 30;
    }

    localStorage.setItem('CantidadDeCartones', String(this.quantity));

    this._homeService.items(this.quantity);
  }
}
