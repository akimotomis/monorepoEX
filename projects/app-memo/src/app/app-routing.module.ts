import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  // { path: 'task', redirectTo: '/task', pathMatch: 'full' },
  // { path: 'tasklist', redirectTo: '/tasklist', pathMatch: 'full' },
  // { path: 'memo', redirectTo: '/task', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
