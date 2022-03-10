import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { menuListItem, MENULISTITEM } from '../../model/menuListItem';
import { MemoService } from '../../service/memo.service';
import { MemoDatamigration } from './../../service/memo.datamigration';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {
  @Input() apiHost!: string;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // properties
  public mainMenuList: menuListItem[] = MENULISTITEM.main.data;
  public supportMenuList: menuListItem[] = MENULISTITEM.support.data;
  public migration = new MemoDatamigration(this.memoServise, this.taskServise);

  constructor(
    private taskServise: TaskService,
    private memoServise: MemoService
  ) {}

  ngOnInit(): void {
    // 環境変数をサービスに設定する
    this.memoServise.host = this.apiHost;
  }

  supportMethod(name: string): void {
    switch (name) {
      case 'reset_indexedDB':
        this.taskServise.deleteDB().subscribe(() => {
          document.location.reload();
        });
        break;

      case 'memo_to_task':
        if (
          !this.taskServise.Share.Data.length &&
          this.memoServise.Share.Data.length
        ) {
          this.migration.memoToTask();
        }

        break;

      case 'task_to_note':
        if (this.taskServise.Share.Data.length) {
          this.migration.taskToNote();
        }

        break;

      default:
        break;
    }
  }
}
