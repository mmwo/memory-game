import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ProfileRoutingModule } from '@app/profile/profile-routing.module';

@NgModule({
  declarations: [ProfileDetailsComponent, ProfileStatsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
