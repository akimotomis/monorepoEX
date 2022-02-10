import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/internal/operators/take';
import { TaskService } from '../../service/task.service';
import { TaskListItem } from '../../model/task';

@Component({
  selector: 'lib-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  // ViewChild
  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;
  // Details FormGroup
  public editForm: FormGroup = this.fb.group({
    id: [],
    status: [''],
    title: ['', Validators.required],
    content: [''],
    createdAt: [''],
    updatedAt: [''],
  });
  private task = {} as TaskListItem;

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log('saveMenuList:ngOnInit');
    // task get by 'id'(paramMap)
    this.taskService.Share.SelectedRow = this.route.snapshot.paramMap.get('id');

    this.taskService
      .get(this.taskService.Share.SelectedRow)
      .subscribe((task) => {
        this.editForm.patchValue(task);
        // this.editForm.patchValue({
        //   title: task.title,
        //   status: task.status,
        //   contents: task.contents
        // })
      });
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  cancel(): void {
    // リストに戻る
    // this.location.back();
    this.router.navigate([
      '/task',
      { id: this.taskService.Share.SelectedRow, foo: 'foo' },
    ]);
  }
  save(): void {
    this.task = this.editForm.value;
    this.task.updatedAt = new Date().toLocaleString();

    this.taskService.put(this.task).subscribe(() => {
      console.log(
        'Observer update complete id=' + this.taskService.Share.SelectedRow
      );
      this.cancel();
    });
  }
}
