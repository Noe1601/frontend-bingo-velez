import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDesactivatedComponent } from './user-desactivated/user-desactivated.component';
import { UsersComponent } from './users/users.component';


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
        {path: 'desactivatedUsers', component: UserDesactivatedComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}