import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsComponent } from './pages/settings/settings.component';
import { CartonesComponent } from './components/cartones/cartones.component';
import { PreciosComponent } from './components/precios/precios.component';
import { PartidasComponent } from './components/partidas/partidas.component';


@NgModule({
  declarations: [SettingsComponent, CartonesComponent, PreciosComponent, PartidasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
