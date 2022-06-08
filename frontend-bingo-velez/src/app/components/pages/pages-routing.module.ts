import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { GamersComponent } from './gamers/gamers.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PlaysComponent } from './plays/plays.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDesactivatedComponent } from './user-desactivated/user-desactivated.component';
import { UsersComponent } from './users/users.component';
import { WinnersComponent } from './winners/winners.component';


export const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    // canActivate: [ AuthGuard ],
    children: [
        { path: 'home', component: HomeComponent },
        { path: 'users', component: UsersComponent },
        { path: 'profile/:id', component: ProfileComponent },
        { path: 'settings', component: SettingsComponent },
        {path: 'desactivatedUsers', component: UserDesactivatedComponent},
        {path: 'plays', component: PlaysComponent},
        {path: 'players', component: GamersComponent},
        {path: 'winners', component: WinnersComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}