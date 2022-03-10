// TODO: Replace this with your own data model type
export interface menuListItem {
  color: string;
  disabled: boolean;
  link: string;
  icon: string;
  name: string;
  id: number;
}
// TODO: replace this with real data from your application
const MAINMENU_DATA: menuListItem[] = [
  {
    id: 1,
    name: 'Memo List',
    icon: 'list',
    link: '/memo',
    disabled: false,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Task List',
    icon: 'view_list',
    link: '/task',
    disabled: false,
    color: 'blue',
  },
];
const SUPPORTMENU_DATA: menuListItem[] = [
  {
    id: 1,
    name: 'reset_indexedDB',
    icon: 'clear_all',
    link: '',
    disabled: false,
    color: 'green',
  },
  {
    id: 2,
    name: 'memo_to_task',
    icon: 'loop',
    link: '',
    disabled: false,
    color: 'green',
  },
  {
    id: 3,
    name: 'task_to_note',
    icon: 'favorite',
    link: '',
    disabled: false,
    color: 'green',
  },
];
const SAVEMENU_DATA: menuListItem[] = [
  {
    id: 1,
    name: 'Save',
    icon: 'favorite',
    link: '',
    disabled: false,
    color: 'green',
  },
  {
    id: 2,
    name: 'Cancel',
    icon: 'clear_all',
    link: '',
    disabled: false,
    color: 'green',
  },
];
export const MENULISTITEM = {
  main: {
    data: MAINMENU_DATA,
  },
  support: {
    data: SUPPORTMENU_DATA,
  },
  save: {
    data: SAVEMENU_DATA,
  },
};
