import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaysDesactivatedComponent } from './core/components/plays-desactivated/plays-desactivated.component';
import { UserDesactivatedComponent } from './core/components/user-desactivated/user-desactivated.component';
import { LoginRoutingModule } from './modules/auth/auth-routing.module';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { GamersComponent } from './modules/gamers/pages/gamers/gamers.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { ModulesComponent } from './modules/modules.component';
import { PlaysComponent } from './modules/plays/pages/plays/plays.component';
import { SettingsComponent } from './modules/settings/pages/settings/settings.component';
import { ProfileComponent } from './modules/users-module/pages/profile/profile.component';
import { UsersComponent } from './modules/users-module/pages/users/users.component';
import { WinnersComponent } from './modules/winners/pages/winners/winners.component';

const routes: Routes = [
  {
    path: '/login', component: LoginComponent
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/auth/auth.module').then(
  //       (m) => m.AuthModule
  //     ),
  // },
  {
    path: 'pages',
    component: ModulesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'plays', component: PlaysComponent },
      { path: 'gamers', component: GamersComponent },
      { path: 'winners', component: WinnersComponent },
      { path: 'users', component: UsersComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'players', component: GamersComponent },
      { path: 'desactivatedUsers', component: UserDesactivatedComponent },
      { path: 'desactivatedPlays', component: PlaysDesactivatedComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    LoginRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
