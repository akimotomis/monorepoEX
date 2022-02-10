import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TaskListComponent } from 'lib-memo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, AfterViewInit {
  // properties
  public isButtonDisabled: boolean = true;
  // ViewChild
  @ViewChild(TaskListComponent) viewChildTaskList!: TaskListComponent;

  constructor() {}

  ngOnInit(): void {
    console.log('TaskComponent:ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('TaskComponent:ngAfterViewInit');
  }

  /**
   * 入力を検証する
   *
   * @param {string} inputText
   */
  validateInput(inputText: string): void {
    if (!inputText) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
  }
  add(inputText: string): void {
    this.isButtonDisabled = true;
    this.viewChildTaskList.dataSource.add(inputText);
  }
}
