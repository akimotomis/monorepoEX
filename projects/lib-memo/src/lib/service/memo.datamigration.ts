import {
  BehaviorSubject,
  catchError,
  finalize,
  interval,
  Observable,
  Observer,
  of,
  take,
} from 'rxjs';
import { TaskListItem } from '../model/task';
import { MemoService } from './memo.service';
import { TaskService } from './task.service';

export class MemoDatamigration {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private memoServise: MemoService,
    private taskServise: TaskService
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
    this.loadingSubject.next(true);

    const interval$ = interval(3000); // 3sずつカウントアップ
    console.log(new Date());
    interval$
      .pipe(
        take(this.taskServise.Share.Data.length), //指定回数実行
        finalize(() => {
          //ストリームが流れた最後に非表示
          this.loadingSubject.next(false);
          this.loadingSubject.complete();
        })
      )
      .subscribe((value) => {
        console.log(new Date());
        console.log(value);
        this.noteAdd(this.taskServise.Share.Data[value]).subscribe();
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
        this.memoServise.addMemo(addItem).subscribe();
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
        take(this.memoServise.Share.Data.length), //指定回数実行
        finalize(() => {
          //ストリームが流れた最後に非表示
          this.loadingSubject.next(false);
          this.loadingSubject.complete();
        })
      )
      .subscribe((value) => {
        console.log(value);
        this.memoServise
          .getMemo(this.memoServise.Share.Data[value].id)
          .subscribe((memo) => {
            let addItem = {} as TaskListItem;
            addItem.content = memo.message.doc.content;
            addItem.title = this.memoServise.Share.Data[value].title;
            addItem.createdAt = this.memoServise.Share.Data[value].updatedAt;
            addItem.updatedAt = this.memoServise.Share.Data[value].updatedAt;
            this.taskServise.Share.Data.push(addItem);
            this.taskServise.post(addItem).subscribe((id) => {
              addItem.id = id;
              this.taskServise.Share.Data.push(addItem);
            });
          });
      });
  }
}
