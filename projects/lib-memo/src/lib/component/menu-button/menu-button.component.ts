import { Component, Input, OnInit } from '@angular/core';
import { MemoService } from '../../service/memo.service';
import { TaskService } from '../../service/task.service';
import { NoteService } from '../../service/note.service';
import { menuListItem, MENULISTITEM } from '../../model/menuListItem';
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
  public migration = new MemoDatamigration(
    this.memoService,
    this.noteService,
    this.taskService
  );

  constructor(
    private memoService: MemoService,
    private noteService: NoteService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // 環境変数をサービスに設定する
    this.memoService.host = this.apiHost;
    this.noteService.host = this.apiHost;
  }

  supportMethod(name: string): void {
    switch (name) {
      case 'reset_indexedDB':
        this.taskService.deleteDB().subscribe(() => {
          document.location.reload();
        });
        break;

      case 'memo_to_task':
        if (
          !this.taskService.Share.Data.length &&
          !this.noteService.Share.Data.length &&
          this.memoService.Share.Data.length
        ) {
          this.migration.memoToTask();
        }

        break;

      case 'task_to_note':
        if (
          this.taskService.Share.Data.length &&
          !this.noteService.Share.Data.length &&
          this.memoService.Share.Data.length
        ) {
          this.migration.taskToNote();
        }

        break;

      default:
        break;
    }
  }
}
