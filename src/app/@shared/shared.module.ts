import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ConfirmModalComponent } from '@shared/modals/confirm-modal/confirm-modal.component';
import { ModalTemplateComponent } from '@shared/components/modal-template/modal-template.component';

const dynamicComponents = [ConfirmModalComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, KeysPipe, ModalTemplateComponent, ...dynamicComponents],
  entryComponents: [...dynamicComponents],
  exports: [LoaderComponent, KeysPipe, ModalTemplateComponent, ...dynamicComponents],
})
export class SharedModule {}
