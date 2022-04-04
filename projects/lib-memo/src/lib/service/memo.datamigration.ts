import {
  BehaviorSubject,
  finalize,
  interval,
  Observable,
  Observer,
  take,
} from 'rxjs';
import { TaskListItem } from '../model/task';
import { MemoService } from './memo.service';
import { TaskService } from './task.service';
import { NoteService } from './note.service';

export class MemoDatamigration {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private memoService: MemoService,
    private noteService: NoteService,
    private taskService: TaskService
  ) {
    // super();
  }

  /**
   * タスクをノートにコンバートする
   *
   * @memberof MemoDatamigration
   */
  public taskToNote(): void {
    console.log('taskToNote start');
    // IndexedDBのidプロパティを降順に並び変える
    let data = [...this.taskService.Share.Data];
    data.sort((a, b) => (a.id - b.id) * -1);

    this.loadingSubject.next(true);

    const interval$ = interval(2000); // 2sずつカウントアップ
    console.log(new Date());
    interval$
      .pipe(
        take(this.taskService.Share.Data.length), //指定回数実行
        finalize(() => {
          //ストリームが流れた最後に非表示
          this.loadingSubject.next(false);
          this.loadingSubject.complete();
        })
      )
      .subscribe((value) => {
        this.noteAdd(data[value]).subscribe();
      });
  }
  private noteAdd(taskItem: TaskListItem): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        let addItem = {} as TaskListItem;
        addItem.status = taskItem.status;
        addItem.title = taskItem.title;
        addItem.content = taskItem.content;
        addItem.createdAt = taskItem.createdAt;
        addItem.updatedAt = addItem.createdAt;
        this.noteService.addNote(addItem).subscribe();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * メモをタスクにコンバートする
   *
   * @memberof MemoDatamigration
   */
  public memoToTask(): void {
    this.loadingSubject.next(true);

    const interval$ = interval(1000); // 1.0sずつカウントアップ
    interval$
      .pipe(
        take(this.memoService.Share.Data.length), //指定回数実行
        finalize(() => {
          // ストリームが流れた最後に非表示
          this.loadingSubject.next(false);
          this.loadingSubject.complete();
        })
      )
      .subscribe((value) => {
        console.log(value);
        this.memoService
          .getMemo(this.memoService.Share.Data[value].id)
          .subscribe((memo) => {
            let addItem = {} as TaskListItem;
            addItem.content = memo.message.doc.content;
            addItem.title = this.memoService.Share.Data[value].title;
            addItem.createdAt = this.memoService.Share.Data[value].updatedAt;
            addItem.updatedAt = this.memoService.Share.Data[value].updatedAt;

            this.taskService.post(addItem).subscribe((id) => {
              addItem.id = id;
              this.taskService.Share.Data.push(addItem);
              if (id >= this.memoService.Share.Data.length) {
                // 現在表示されているページをリロードする
                document.location.reload();
              }
            });
          });
      });
  }
}
