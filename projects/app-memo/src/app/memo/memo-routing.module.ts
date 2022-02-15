import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoComponent } from './memo/memo.component';

const routes: Routes = [
  // { path: '', redirectTo: '/memo', pathMatch: 'full' },
  { path: 'memolist', redirectTo: '/memo' },
  { path: 'memodetail/:id', redirectTo: '/memo/:id' },
  // { path: 'memo/:id', component: MemoDtailComponent },
  { path: 'memo', component: MemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoRoutingModule {}
