import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginRoutingModule } from './components/pages/login/auth-routing.module';
import { RegisterRoutingModule } from './components/pages/register/register-routing.module';
import { PagesModule } from './components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/shared/material/material.module';
import { SharedModule } from './components/shared/shared.module';
import { AuthModule } from './components/pages/login/auth.module';
import { RegisterModule } from './components/pages/register/register.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    RegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
