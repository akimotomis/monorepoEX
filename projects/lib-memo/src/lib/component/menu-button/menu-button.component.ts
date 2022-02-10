import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { menuListItem, MENULISTITEM } from '../../model/menuListItem';

@Component({
  selector: 'lib-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {
  /** */
  public mainMenuList: menuListItem[] = MENULISTITEM.main.data;
  public supportMenuList: menuListItem[] = MENULISTITEM.support.data;

  constructor(private taskServise: TaskService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  supportMethod(name: string): void {
    switch (name) {
      case 'reset_indexedDB':
        this.taskServise.deleteDB().subscribe(() => {
          document.location.reload();
        });
        break;

      default:
        break;
    }
  }
}
