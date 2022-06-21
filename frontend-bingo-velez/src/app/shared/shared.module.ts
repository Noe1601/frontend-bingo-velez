import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { SidenavComponent } from '../core/components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../core/components/footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, FooterComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavbarComponent, SidenavComponent, FooterComponent],
})
export class SharedModule {}
