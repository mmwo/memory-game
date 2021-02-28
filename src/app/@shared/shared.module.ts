import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ConfirmModalComponent } from '@shared/modals/confirm-modal/confirm-modal.component';

const dynamicComponents = [ConfirmModalComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, KeysPipe, ...dynamicComponents],
  entryComponents: [...dynamicComponents],
  exports: [LoaderComponent, KeysPipe, ...dynamicComponents],
})
export class SharedModule {}
