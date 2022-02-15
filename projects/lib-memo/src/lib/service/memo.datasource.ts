import { HttpResponse } from '@angular/common/http';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { MemoListItem } from '../model/memo';
import { MemoService } from './memo.service';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[libMemoDatasource]',
})
export class MemoDatasourceDirective implements DataSource<MemoListItem> {
  // input
  @Input()
  selectedrow!: number;
  @Input()
  pageIndex!: number;
  @Input()
  pageSize!: number;
  // properties
  public dataLength: number = 0;

  private subject = new BehaviorSubject<MemoListItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private memoServise: MemoService) {
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

    this.memoServise
      .getMemoList()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((res: any) => {
        // const response: any = res(body);
        const list = res.message.list;
        this.memoServise.Share.Data = list.map((x: { value: any }) => x.value);
        // this.memoServise.Share.Data = res.body;
        this.dataLength = this.memoServise.Share.Data.length;
        this.getPage();
      });
  }
  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  public getPage(): void {
    this.subject.next(
      this.getPagedData(this.getSortedData([...this.memoServise.Share.Data]))
    );
  }

  private getPagedData(data: MemoListItem[]): MemoListItem[] {
    const startIndex =
      this.memoServise.Share.PageIndex * this.memoServise.Share.PageSize;
    return data.splice(startIndex, this.memoServise.Share.PageSize);
  }
  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MemoListItem[]): MemoListItem[] {
    // return data;
    return data.sort((a, b) => {
      const isAsc = this.memoServise.Share.SortDirection === 'asc';
      switch (this.memoServise.Share.SortAactive) {
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
