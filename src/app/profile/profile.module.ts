import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { StatsComponent } from './components/stats/stats.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { ProfileRoutingModule } from '@app/profile/profile-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ProfileDetailsComponent, StatsComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, ProfileRoutingModule, ChartsModule],
})
export class ProfileModule {}
