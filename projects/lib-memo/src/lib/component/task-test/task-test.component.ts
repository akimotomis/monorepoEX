import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-task-test',
  templateUrl: './task-test.component.html',
  styleUrls: ['./task-test.component.scss'],
})
export class TaskTestComponent implements OnInit {
  public editName = 'button';
  public value = 'Clear me';

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.editName = '';
  }
  /**
   * cancel
   */
  public cancel(): void {
    this.editName = '';
  }
  /**
   * save
   */
  public save(): void {
    this.editName = 'save';
  }
}
