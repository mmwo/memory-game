import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { ProfileRoutingModule } from '@app/profile/profile-routing.module';
import { ChartsModule } from 'ng2-charts';
import { BigChartComponent } from './components/big-chart/big-chart.component';

@NgModule({
  declarations: [ProfileDetailsComponent, ProfileStatsComponent, BigChartComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, ProfileRoutingModule, ChartsModule],
})
export class ProfileModule {}
