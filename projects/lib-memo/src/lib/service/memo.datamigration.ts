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

    for (const iterator of this.memoServise.Share.Data) {
      this.memoGet(iterator.id)
        .pipe(
          catchError(() => of([])),
          finalize(() => {
            // this.loadingSubject.next(false);
            this.taskToDb();
          })
        )
        .subscribe((content) => {
          let addItem = {} as TaskListItem;
          addItem.content = content;
          addItem.title = iterator.title;
          addItem.createdAt = iterator.updatedAt;
          addItem.updatedAt = iterator.updatedAt;
          this.taskServise.Share.Data.push(addItem);
        });
    }
  }
  private memoGet(id: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.memoServise.getMemo(id).subscribe();
      } catch (error) {
        observer.error(error);
      }
    });
  }
  private taskToDb(): void {
    // this.loadingSubject.next(true);

    for (const iterator of this.taskServise.Share.Data) {
      this.taskAdd(iterator)
        .pipe(
          catchError(() => of([])),
          finalize(() => {
            this.taskServise.Share.Data = [];
            this.loadingSubject.next(false);
            this.loadingSubject.complete();
          })
        )
        .subscribe();
    }
  }
  private taskAdd(addItem: TaskListItem): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.taskServise
          .post(addItem)
          .pipe(take(1))
          .subscribe((id) => {
            observer.next(id);
            if (this.memoServise.Share.Data.length === id) {
              // this.loadingSubject.complete();
              observer.complete();
            }
          });
      } catch (error) {
        observer.error(error);
      }
    });
  }
}
