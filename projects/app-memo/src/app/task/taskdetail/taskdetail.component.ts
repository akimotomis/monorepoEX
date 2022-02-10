import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuContextComponent, TaskFormComponent, TaskService } from 'lib-memo';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.scss'],
})
export class TaskdetailComponent implements OnInit {
  // properties
  public contextMenuPosition = { x: '0px', y: '0px' };
  // ViewChild
  @ViewChild(TaskFormComponent)
  ViewChildTaskform!: TaskFormComponent;
  @ViewChild(MenuContextComponent) viewChildMenuContext!: MenuContextComponent;
  //  @ViewChild(MatMenuTrigger)
  // menu!: MatMenuTrigger;

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('TaskdetailComponent:ngOnInit');
  }

  menuMethod(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.viewChildMenuContext.menu.menu.focusFirstItem('mouse');
    this.viewChildMenuContext.menu.openMenu();
    // this.menu.menu.focusFirstItem('mouse');
    // this.menu.openMenu();
  }

  cancel(): void {
    this.ViewChildTaskform.cancel();
  }

  save(): void {
    this.ViewChildTaskform.save();
  }
}
