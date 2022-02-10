import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-task-inputlegacy',
  templateUrl: './task-inputlegacy.component.html',
  styleUrls: ['./task-inputlegacy.component.scss'],
})
export class TaskInputlegacyComponent implements OnInit {
  /**
   * 入力テキスト
   *
   * @type {string}
   * @memberof TaskInputComponent
   */
  inText: string = '';
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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  /**
   * 入力変更発生を通知する
   *
   * @param {string} inText
   * @memberof TaskInputComponent
   */
  input(inText: string): void {
    this.change.emit(inText);
  }
  /**
   * 追加イベント発生を通知する
   *
   * @memberof TaskInputComponent
   */
  click(): void {
    this.add.emit(this.inText);
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
