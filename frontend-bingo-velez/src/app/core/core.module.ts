import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UpdatePlayerComponent } from './components/update-player/update-player.component';
import { UpdatePlaysComponent } from './components/update-plays/update-plays.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateWinnersComponent } from './components/update-winners/update-winners.component';
import { UserDesactivatedComponent } from './components/user-desactivated/user-desactivated.component';
import { ViewWinnerDetailsComponent } from './components/view-winner-details/view-winner-details.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { CreatePlayComponent } from './components/create-play/create-play.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PlaysDesactivatedComponent } from './components/plays-desactivated/plays-desactivated.component';
import { RecuperatePasswordComponent } from './components/recuperate-password/recuperate-password.component';
import { AssignJugadasComponent } from './components/assign-jugadas/assign-jugadas.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidenavComponent,
    UpdatePlayerComponent,
    UpdatePlaysComponent,
    UpdateUserComponent,
    UpdateWinnersComponent,
    UserDesactivatedComponent,
    ViewWinnerDetailsComponent,
    CreatePlayerComponent,
    CreatePlayComponent,
    PlaysDesactivatedComponent,
    RecuperatePasswordComponent,
    AssignJugadasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
    FooterComponent
  ]
})
export class CoreModule { }
