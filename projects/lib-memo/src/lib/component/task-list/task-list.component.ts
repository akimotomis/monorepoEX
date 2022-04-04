import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, tap } from 'rxjs';
import { TaskDataSource } from '../../service/task.datasource';
import { TaskService } from '../../service/task.service';
import { ListColumn, TASK_COLUMN } from '../../model/listColumn';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'lib-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, AfterViewInit {
  // properties
  public dataSource: TaskDataSource = new TaskDataSource(this.taskService);
  public columDef: ListColumn[] = TASK_COLUMN.mini.data;
  public displayedColumns: string[] = TASK_COLUMN.mini.data.map((v) => v.def);
  // public displayedColumns = ['id', 'title', 'updatedAt', 'createdAt', 'delbtn'];

  // ブラウザ戻りボタンに対応（選択行selectedrow）
  public selectedrow: number = this.taskService.Share.SelectedRow;
  public pageIndex: number = this.taskService.Share.PageIndex;
  public pageSize: number = this.taskService.Share.PageSize;
  // ViewChild
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('TaskListComponent:ngOnInit');
    // detailからの戻りの場合、編集対象のIDでListを復元する
    this.selectedrow = parseInt(this.taskService.Share.SelectedRow, 10);
    if (this.taskService.Share.Data.length) {
      console.log('selectedrow::' + this.selectedrow);
      this.dataSource.dataLength = this.taskService.Share.Data.length;
      this.dataSource.getPage();
    } else {
      this.dataSource.load();
    }
    // ブラウザ戻りボタンに対応（選択行selectedrow）←不要
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.selectedrow = parseInt(params.get('id')!, 10);
    //   console.log('selectedrow(param)::' + parseInt(params.get('id')!, 10));
    //   this.selectedrow = parseInt(this.taskService.Share.SelectedRow, 10);
    //   console.log('selectedrow(Share)::' + this.selectedrow);
    // });
  }

  ngAfterViewInit(): void {
    console.log('TaskListComponent:ngAfterViewInit');
    // 選択行をリセットする
    this.taskService.Share.SelectedRow = 0;
    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          // List復元用のpaginator設定値を退避する
          if (this.sort.active) {
            this.taskService.Share.SortActive = this.sort.active;
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
        console.log('merge complete');
      });
  }
  delete(id: number): void {
    this.taskService.Share.SelectedRow = '';
    this.dataSource.del(id);
  }
}
