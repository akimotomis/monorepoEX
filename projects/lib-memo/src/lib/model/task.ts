export interface TaskListItem {
  id: number;
  status: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface TaskListShare {
  SelectedRow: any;
  PageIndex: number;
  PageSize: number;
  SortAactive: string;
  SortDirection: string;
  Data: TaskListItem[];
}
