import { Component, OnInit } from '@angular/core';
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
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // properties
  public mainMenuList: menuListItem[] = MENULISTITEM.main.data;
  public supportMenuList: menuListItem[] = MENULISTITEM.support.data;
  public migration = new MemoDatamigration(this.memoServise, this.taskServise);

  constructor(
    private taskServise: TaskService,
    private memoServise: MemoService
  ) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

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

      default:
        break;
    }
  }
}
