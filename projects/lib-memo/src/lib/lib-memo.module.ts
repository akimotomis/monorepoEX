import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material/material.module';

import { MenuButtonComponent } from './component/menu-button/menu-button.component';
import { MenuContextComponent } from './component/menu-context/menu-context.component';
import { TaskInputComponent } from './component/task-input/task-input.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { TaskFormComponent } from './component/task-form/task-form.component';
import { MemoListComponent } from './component/memo-list/memo-list.component';
// import { MemoDatasourceDirective } from './directive/memo-datasource.directive';

// import { TaskInputlegacyComponent } from './component/task-inputlegacy/task-inputlegacy.component';
// import { TaskListlegacyComponent } from './component/task-listlegacy/task-listlegacy.component';

@NgModule({
  declarations: [
    TaskInputComponent,
    MenuButtonComponent,
    MenuContextComponent,
    TaskListComponent,
    TaskFormComponent,
    MemoListComponent,
    // MemoDatasourceDirective,
    // TaskInputlegacyComponent,
    // TaskListlegacyComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    MenuButtonComponent,
    MenuContextComponent,
    TaskInputComponent,
    TaskListComponent,
    TaskFormComponent,
    MemoListComponent,
  ],
})
export class LibMemoModule {}
