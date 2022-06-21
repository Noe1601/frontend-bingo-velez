import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RecuperatePasswordComponent } from './core/components/recuperate-password/recuperate-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { ModulesComponent } from './modules/modules.component';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/pages/home.module';
import { UsersModule } from './modules/users-module/pages/users.module';
import { GamersModule } from './modules/gamers/gamers.module';
import { PlaysModule } from './modules/plays/plays.module';
import { WinnersModule } from './modules/winners/winners.module';

@NgModule({
  declarations: [
    AppComponent,
    ModulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    AuthModule,
    HomeModule,
    UsersModule,
    GamersModule,
    PlaysModule,
    WinnersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
