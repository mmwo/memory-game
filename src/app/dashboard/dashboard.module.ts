import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { StatsComponent } from '@app/dashboard/components/stats/stats.component';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
