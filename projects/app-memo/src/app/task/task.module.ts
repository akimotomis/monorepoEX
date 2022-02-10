import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatMenuModule } from '@angular/material/menu';

// import { TaskListComponent } from './task-list/task-list.component';
// import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { LibMemoModule } from 'lib-memo';
import { TaskComponent } from './task/task.component';
import { TaskdetailComponent } from './taskdetail/taskdetail.component';

@NgModule({
  declarations: [TaskdetailComponent, TaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    // MatTableModule,
    // MatInputModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatMenuModule,
    TextFieldModule,
    LibMemoModule,
  ],
})
export class TaskModule {}
