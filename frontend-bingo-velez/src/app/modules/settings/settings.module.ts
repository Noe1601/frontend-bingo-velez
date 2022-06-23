import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [SettingsComponent],
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
