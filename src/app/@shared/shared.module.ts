import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, KeysPipe],
  exports: [LoaderComponent, KeysPipe],
})
export class SharedModule {}
