import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProfileDetailsComponent } from '@app/profile/components/profile-details/profile-details.component';
import { ProfileStatsComponent } from '@app/profile/components/profile-stats/profile-stats.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/memory/play', pathMatch: 'full' },
    { path: 'profile/details', component: ProfileDetailsComponent, data: { title: extract('Details') } },
    { path: 'profile/stats', component: ProfileStatsComponent, data: { title: extract('Statistics') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule {}
