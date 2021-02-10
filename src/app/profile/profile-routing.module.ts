import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { ProfileDetailsComponent } from '@app/profile/components/profile-details/profile-details.component';
import { StatsComponent } from '@app/profile/components/stats/stats.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/stats', pathMatch: 'full' },
    { path: 'details', component: ProfileDetailsComponent, data: { title: marker('Details') } },
    { path: 'stats', component: StatsComponent, data: { title: marker('Statistics'), background: false } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ProfileRoutingModule {}
