import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { TaskListComponent } from './task-list/task-list.component';
// import { TaskListComponent } from 'lib-memo';
// import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskComponent } from './task/task.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';
const routes: Routes = [
  // { path: 'tasklist', redirectTo: '/tasklegacy' },
  // { path: 'tasklegacy', component: TaskListComponent },
  { path: 'tasklist', redirectTo: '/task' },
  { path: 'taskdetail/:id', redirectTo: '/task/:id' },
  { path: 'task/:id', component: TaskdetailComponent },
  // { path: 'task/:id', component: TaskDetailComponent },
  // { path: 'task', component: TaskListComponent },
  { path: 'task', component: TaskComponent },
  // { path: 'task', component: TaskListComponent, data: { animation: 'heroes' } },
  // {
  //   path: 'task/:id',
  //   component: TaskDetailComponent,
  //   data: { animation: 'hero' },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
