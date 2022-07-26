import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { PlaysComponent } from './pages/plays/plays.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [PlaysComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaysModule { }
