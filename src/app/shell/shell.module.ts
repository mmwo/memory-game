import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell.component';
import { SidebarComponent } from '@app/shell/__module/sidebar/sidebar.component';
import { NavbarComponent } from '@app/shell/__module/navbar/navbar.component';
import { FooterComponent } from '@app/shell/__module/footer/footer.component';

import { AuthModule } from '@app/auth';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, TranslateModule, RouterModule, AuthModule, NgbCollapseModule, NgbDropdownModule],
  declarations: [ShellComponent, SidebarComponent, NavbarComponent, FooterComponent],
})
export class ShellModule {}
