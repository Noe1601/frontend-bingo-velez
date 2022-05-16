import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutingModule } from './components/pages/login/auth-routing.module';
import { LoginComponent } from './components/pages/login/login.component';
import { PagesRoutingModule } from './components/pages/pages-routing.module';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterRoutingModule } from './components/pages/register/register-routing.module';

const routes: Routes = [{ path: '', component: PagesComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule,
    LoginRoutingModule,
    RegisterRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
