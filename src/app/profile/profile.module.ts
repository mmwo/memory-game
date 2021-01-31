import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { StatsComponent } from '../dashboard/components/stats/stats.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ProfileRoutingModule } from '@app/profile/profile-routing.module';

@NgModule({
  declarations: [ProfileDetailsComponent, StatsComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
