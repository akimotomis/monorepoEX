// import { HttpResponse } from '@angular/common/http';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { MemoListItem } from '../model/memo';
import { MemoService } from './memo.service';

export class MemoDatasource implements DataSource<MemoListItem> {
  private subject = new BehaviorSubject<MemoListItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // properties
  public dataLength: number = 0;
  public loading$ = this.loadingSubject.asObservable();

  constructor(private memoService: MemoService) {
    // super();
  }

  connect(collectionViewer: CollectionViewer): Observable<MemoListItem[]> {
    console.log('Connecting data source');
    return this.subject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }
  load(): void {
    this.loadingSubject.next(true);

    this.memoService
      .getMemoList()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: any) => {
        // const response: any = res(body);
        const list = res.message.list;
        this.memoService.Share.Data = list.map((x: { value: any }) => x.value);
        // this.memoService.Share.Data = res.body;
        this.dataLength = this.memoService.Share.Data.length;
        this.getPage();
      });
  }
  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  public getPage(): void {
    this.subject.next(
      this.getPagedData(this.getSortedData([...this.memoService.Share.Data]))
    );
  }

  private getPagedData(data: MemoListItem[]): MemoListItem[] {
    const startIndex =
      this.memoService.Share.PageIndex * this.memoService.Share.PageSize;
    return data.splice(startIndex, this.memoService.Share.PageSize);
  }
  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MemoListItem[]): MemoListItem[] {
    // return data;
    return data.sort((a, b) => {
      const isAsc = this.memoService.Share.SortDirection === 'asc';
      switch (this.memoService.Share.SortActive) {
        case 'updatedAt':
          return compare(a.updatedAt, b.updatedAt, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
