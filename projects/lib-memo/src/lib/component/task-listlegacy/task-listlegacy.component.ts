import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, tap } from 'rxjs';
import { TaskService } from '../../service/task.service';
import { TaskListDataSource } from './task-list-datasource';

@Component({
  selector: 'lib-task-listlegacy',
  templateUrl: './task-listlegacy.component.html',
  styleUrls: ['./task-listlegacy.component.scss'],
})
export class TaskListlegacyComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  // properties
  public dataSource: TaskListDataSource = new TaskListDataSource(
    this.taskService
  );
  public displayedColumns = ['id', 'title', 'updatedAt', 'createdAt', 'delbtn'];
  public selectedrow: number = this.taskService.Share.SelectedRow;
  public pageIndex: number = this.taskService.Share.PageIndex;
  public pageSize: number = this.taskService.Share.PageSize;
  /**
   * 入力検査結果（ボタン活性/非活性）
   *
   * @type {boolean}
   * @memberof TaskListComponent
   */
  public isButtonDisabled: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // detailからの戻りの場合、編集対象のIDでListを復元する
    if (this.selectedrow) {
      console.log('selectedrow::' + this.taskService.Share.SelectedRow);
      this.taskService.Share.SelectedRow = '';
      this.dataSource.dataLength = this.taskService.Share.Data.length;
      this.dataSource.getPage();
    } else {
      this.dataSource.load();
    }
  }

  ngAfterViewInit(): void {
    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          // List復元用のpaginator設定値を退避する
          if (this.sort.active) {
            this.taskService.Share.SortAactive = this.sort.active;
            this.taskService.Share.SortDirection = this.sort.direction;
          }
          if (this.paginator.page) {
            this.taskService.Share.PageIndex = this.paginator.pageIndex;
            this.taskService.Share.PageSize = this.paginator.pageSize;
          }

          this.dataSource.getPage();
        })
      )
      .subscribe(() => {
        console.log('ngAfterViewInit merge complete');
      });
  }

  /**
   * 入力を検証する
   *
   * @param {string} inputText
   * @memberof TaskListComponent
   */
  validateInput(inputText: string): void {
    if (!inputText) {
      this.isButtonDisabled = true;
    } else {
      this.isButtonDisabled = false;
    }
  }

  add(inText: string): void {
    this.isButtonDisabled = true;
    this.dataSource.add(inText);
  }

  delete(id: number): void {
    this.taskService.Share.SelectedRow = '';
    this.dataSource.del(id);
  }
}
