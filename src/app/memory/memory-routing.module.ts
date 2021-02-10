import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './containers/board/board.component';
import { Shell } from '@app/shell/shell.service';
import { GameBuilderComponent } from '@app/memory/containers/game-builder/game-builder.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  // Shell.childRoutes([
  { path: '', redirectTo: 'play', pathMatch: 'full' },
  { path: 'play', component: BoardComponent, data: { title: marker('Play Memory') } },
  { path: 'builder', component: GameBuilderComponent, data: { title: marker('Builder') } },
  // ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class MemoryRoutingModule {}
