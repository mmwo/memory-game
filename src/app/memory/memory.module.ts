import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { MemoryRoutingModule } from './memory-routing.module';
import { BoardComponent } from './containers/board/board.component';
import { CardComponent } from '@app/memory/components/card/card.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { TimerComponent } from './components/timer/timer.component';
import { GameBuilderComponent } from './containers/game-builder/game-builder.component';
import { SizerDirective } from './directives/sizer.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    MemoryRoutingModule
  ],
  declarations: [BoardComponent, CardComponent, TimeFormatPipe, TimerComponent, GameBuilderComponent, SizerDirective]
})
export class MemoryModule {}
