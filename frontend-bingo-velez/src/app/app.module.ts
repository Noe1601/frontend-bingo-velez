import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesModule } from './components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/shared/material/material.module';
import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './components/pages/login/auth.module';
import { RegisterModule } from './components/pages/register/register.module';
import { HttpClientModule } from '@angular/common/http';
import { RecuperatePasswordComponent } from './components/recuperate-password/recuperate-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecuperatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    RegisterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
