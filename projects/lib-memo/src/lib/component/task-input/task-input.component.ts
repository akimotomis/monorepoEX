import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent implements OnInit {
  public inTextfmc = new FormControl('');
  public styleColor = 'blue';

  /**
   * 入力検査結果（ボタン活性/非活性）
   *
   * @type {boolean}
   * @memberof TaskInputComponent
   */
  @Input() isButtonDisabled: boolean = true;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() add: EventEmitter<string> = new EventEmitter<string>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}
  /**
   * 入力変更発生を通知する
   *
   * @memberof TaskInputComponent
   */
  ngOnInit(): void {
    this.inTextfmc.valueChanges.subscribe((v) => {
      // console.log(v);
      this.change.emit(v);
    });
  }
  /**
   * 追加イベント発生を通知する
   *
   * @memberof TaskInputComponent
   */
  click(): void {
    this.add.emit(this.inTextfmc.value);
    // this.inTextfmc = new FormControl('');
    this.inTextfmc.setValue('', { emitEvent: false });
  }
  /**
   * 改行入力(enter)を追加ボタンの代替にする
   *
   * @param {*} keyEvent
   * @returns
   * @memberof TaskInputComponent
   */
  keyUp(keyEvent: any) {
    if (keyEvent.code !== 'Enter') return;
    if (!this.isButtonDisabled) {
      this.click();
    }
  }
}
