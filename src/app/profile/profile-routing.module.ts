import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProfileDetailsComponent } from '@app/profile/components/profile-details/profile-details.component';
import { StatsComponent } from '@app/dashboard/components/stats/stats.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/memory/play', pathMatch: 'full' },
    { path: 'profile/details', component: ProfileDetailsComponent, data: { title: extract('Details') } },
    { path: 'profile/stats', component: StatsComponent, data: { title: extract('Statistics') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProfileRoutingModule {}
