import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavbarComponent, SidenavComponent, FooterComponent],
})
export class SharedModule {}
