import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibMemoModule } from 'lib-memo';
import { MemoRoutingModule } from './memo-routing.module';
import { MemoComponent } from './memo/memo.component';

@NgModule({
  declarations: [MemoComponent],
  imports: [CommonModule, MemoRoutingModule, LibMemoModule],
})
export class MemoModule {}
