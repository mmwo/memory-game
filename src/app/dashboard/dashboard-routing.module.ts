import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { StatsComponent } from '@app/dashboard/components/stats/stats.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'stats', component: StatsComponent, data: { title: extract('Statistics') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DashboardRoutingModule {}
