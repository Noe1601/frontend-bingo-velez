import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { HomeComponent } from './home/home.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDesactivatedComponent } from './user-desactivated/user-desactivated.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WinnersComponent } from './winners/winners.component';
import { GamersComponent } from './gamers/gamers.component';
import { PlaysComponent } from './plays/plays.component';

@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    PagesComponent,
    SettingsComponent,
    ProfileComponent,
    UserDesactivatedComponent,
    UpdateUserComponent,
    WinnersComponent,
    GamersComponent,
    PlaysComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
