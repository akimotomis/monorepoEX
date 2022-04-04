import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { TaskListItem } from '../../model/task';
import { TaskService } from '../../service/task.service';
// import { TaskListItem, TaskService } from 'lib-memo';

/**
 * TaskListビューのデータソース
 * データを操作するロジックをカプセル化します。
 * (including sorting, pagination, and filtering).
 */
export class TaskListDataSource implements DataSource<TaskListItem> {
  // public data: TaskListItem[] = [];
  public dataLength: number = 0;
  private paginator!: MatPaginator;
  private sort!: MatSort;

  private subject = new BehaviorSubject<TaskListItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private taskService: TaskService) {
    // super();
  }

  connect(collectionViewer: CollectionViewer): Observable<TaskListItem[]> {
    console.log('Connecting data source');
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }

  /**
   * 全データをロードする
   *
   * @memberof TaskListDataSource
   */
  load(): void {
    this.loadingSubject.next(true);

    this.taskService
      .get()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((tasks) => {
        this.dataLength = this.taskService.Share.Data.length;
        this.getPage();
      });
  }

  /**
   * データを追加する
   *
   * @param {string} title
   * @memberof TaskListDataSource
   */
  add(title: string): void {
    let addItem = {} as TaskListItem;
    addItem.title = title;
    addItem.createdAt = new Date().toLocaleString();
    addItem.updatedAt = addItem.createdAt;

    this.taskService.post(addItem).subscribe((id) => {
      addItem.id = id;
      // this.data.push(addItem)
      this.taskService.Share.Data.push(addItem);
      this.dataLength = this.taskService.Share.Data.length;
      this.getPage();
    });
  }

  /**
   * データを削除する
   *
   * @param {number} id
   * @memberof TaskListDataSource
   */
  del(id: number): void {
    this.taskService.delete(id).subscribe((v) => {
      this.taskService.Share.Data = this.taskService.Share.Data.filter(
        (v) => v.id !== id
      );
      this.dataLength = this.taskService.Share.Data.length;
      this.getPage();
    });
  }

  /**
   * データベースをリセットする（deleteDatabase削除＋location.reload()再接続）
   *
   * @memberof TaskListDataSource
   */
  resetDB(): void {
    this.taskService.deleteDB().subscribe();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  public getPage(): void {
    this.subject.next(
      this.getPagedData(this.getSortedData([...this.taskService.Share.Data]))
    );
  }

  private getPagedData(data: TaskListItem[]): TaskListItem[] {
    const startIndex =
      this.taskService.Share.PageIndex * this.taskService.Share.PageSize;
    return data.splice(startIndex, this.taskService.Share.PageSize);
  }
  //  if (this.paginator) {
  //       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //       return data.splice(startIndex, this.paginator.pageSize);
  //     } else {
  //       const startIndex = this.taskService.Share.PageIndex * this.taskService.Share.PageSize;
  //       return data.splice(startIndex, this.taskService.Share.PageSize);
  //     }
  //   }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TaskListItem[]): TaskListItem[] {
    // return data;
    return data.sort((a, b) => {
      const isAsc = this.taskService.Share.SortDirection === 'asc';
      switch (this.taskService.Share.SortActive) {
        case 'updatedAt':
          return compare(a.updatedAt, b.updatedAt, isAsc);
        case 'createdAt':
          return compare(a.createdAt, b.createdAt, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }

  // if (!this.sort || !this.sort.active || this.sort.direction === '') {
  //   // return data;
  //   return data.sort((a, b) => {
  //     const isAsc = this.taskService.Share.SortDirection === 'asc';
  //     switch (this.taskService.Share.SortActive) {
  //       case 'updatedAt': return compare(a.updatedAt, b.updatedAt, isAsc);
  //       case 'createdAt': return compare(a.createdAt, b.createdAt, isAsc);
  //       case 'title': return compare(a.title, b.title, isAsc);
  //       case 'id': return compare(+a.id, +b.id, isAsc);
  //       default: return 0;
  //     }
  //   });

  // }
  // else {
  //   return data.sort((a, b) => {
  //     const isAsc = this.sort?.direction === 'asc';
  //     switch (this.sort?.active) {
  //       case 'updatedAt': return compare(a.updatedAt, b.updatedAt, isAsc);
  //       case 'createdAt': return compare(a.createdAt, b.createdAt, isAsc);
  //       case 'title': return compare(a.title, b.title, isAsc);
  //       case 'id': return compare(+a.id, +b.id, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
