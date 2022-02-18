import { MemoDatasource } from '../../service/memo.datasource';
import { MemoService } from '../../service/memo.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MEMO_COLUMN } from '../../model/listColumn';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'lib-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.scss'],
})
export class MemoListComponent implements OnInit, AfterViewInit {
  // properties
  public dataSource: MemoDatasource = new MemoDatasource(this.memoService);
  public columDef: any[] = MEMO_COLUMN.mini.data;
  public displayedColumns: string[] = MEMO_COLUMN.mini.data.map((v) => v.def);
  // ブラウザ戻りボタンに対応（選択行selectedrow）
  public selectedrow: number = this.memoService.Share.SelectedRow;
  public pageIndex: number = this.memoService.Share.PageIndex;
  public pageSize: number = this.memoService.Share.PageSize;
  // ViewChild
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private memoService: MemoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('ListCommonComponent:ngOnInit');
    // detailからの戻りの場合、編集対象のIDでListを復元する
    this.selectedrow = parseInt(this.memoService.Share.SelectedRow, 10);
    if (this.memoService.Share.Data.length) {
      console.log('selectedrow::' + this.selectedrow);
      this.dataSource.dataLength = this.memoService.Share.Data.length;
      this.dataSource.getPage();
    } else {
      this.dataSource.load();
    }
  }
  ngAfterViewInit(): void {
    console.log('TaskListComponent:ngAfterViewInit');
    // 選択行をリセットする
    this.memoService.Share.SelectedRow = 0;
    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          // List復元用のpaginator設定値を退避する
          if (this.sort.active) {
            this.memoService.Share.SortAactive = this.sort.active;
            this.memoService.Share.SortDirection = this.sort.direction;
          }
          if (this.paginator.page) {
            this.memoService.Share.PageIndex = this.paginator.pageIndex;
            this.memoService.Share.PageSize = this.paginator.pageSize;
          }

          this.dataSource.getPage();
        })
      )
      .subscribe(() => {
        console.log('merge complete');
      });
  }
  delete(id: number): void {}
}
