import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/core';
import { BoardComponent } from './containers/board/board.component';
import { Shell } from '@app/shell/shell.service';
import { GameBuilderComponent } from '@app/memory/containers/game-builder/game-builder.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/memory/play', pathMatch: 'full' },
    {
      path: 'memory/play',
      component: BoardComponent,
      data: { title: extract('Play Memory') }
    },
    { path: 'memory/builder', component: GameBuilderComponent, data: { title: extract('Builder') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MemoryRoutingModule {}
