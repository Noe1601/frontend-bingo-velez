import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterModule { }
