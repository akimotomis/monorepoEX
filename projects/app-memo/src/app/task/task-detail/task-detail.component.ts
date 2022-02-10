import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/internal/operators/take';
import { TaskListItem, TaskService } from 'lib-memo';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  // Details Id
  // editId: string | null = ""

  private task = {} as TaskListItem;

  // Details FormGroup
  editForm: FormGroup = this.fb.group({
    id: [],
    status: [''],
    title: ['', Validators.required],
    content: [''],
    createdAt: [''],
    updatedAt: [''],
    // aliases: this.fb.array([
    //   this.fb.control('')
    // ])
  });

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private location: Location
  ) {}

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  ngOnInit() {
    // task get by 'id'(paramMap)
    this.taskService.Share.SelectedRow = this.route.snapshot.paramMap.get('id');

    this.taskService
      .get(this.taskService.Share.SelectedRow)
      .subscribe((task) => {
        this.task = task;
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
  goBack(): void {
    // リストに戻る
    // this.location.back();
    this.router.navigate([
      '/task',
      { id: this.taskService.Share.SelectedRow, foo: 'foo' },
    ]);
  }
  onSave(task: TaskListItem): void {
    task.updatedAt = new Date().toLocaleString();

    this.taskService.put(task).subscribe(() => {
      console.log(
        'Observer update complete id=' + this.taskService.Share.SelectedRow
      );
      // this.taskService.EditId = ''
      this.goBack();
    });
  }
}
