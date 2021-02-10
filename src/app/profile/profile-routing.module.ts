import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { ProfileDetailsComponent } from '@app/profile/components/profile-details/profile-details.component';
import { ProfileStatsComponent } from '@app/profile/components/profile-stats/profile-stats.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/profile/stats', pathMatch: 'full' },
    { path: 'profile/details', component: ProfileDetailsComponent, data: { title: marker('Details') } },
    {
      path: 'profile/stats',
      component: ProfileStatsComponent,
      data: { title: marker('Statistics'), background: false },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProfileRoutingModule {}
