import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MENULISTITEM, menuListItem } from '../../model/menuListItem';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'lib-menu-context',
  templateUrl: './menu-context.component.html',
  styleUrls: ['./menu-context.component.scss'],
})
export class MenuContextComponent implements OnInit {
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();

  // ViewChild
  @ViewChild(MatMenuTrigger)
  menu!: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  public saveMenuList: menuListItem[] = MENULISTITEM.save.data;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('saveMenuList:ngOnInit');
  }

  // menuMethod(event: MouseEvent) {
  //   // event既定の動作を止める
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   // メニューの最初の項目にfocus
  //   this.menu.menu.focusFirstItem('mouse');
  //   this.menu.openMenu();
  // }

  saveMethod(id: number): void {
    switch (id) {
      case this.saveMenuList[0].id:
        this.save.emit();
        break;

      default:
        this.cancel.emit();
        break;
    }
  }
}
