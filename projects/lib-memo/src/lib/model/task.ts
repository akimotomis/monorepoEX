export interface TaskListItem {
  id: number;
  status: string;
  category: string;
  title: string;
  content: string;
  accessCount: number;
  updateCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface TaskListShare {
  SelectedRow: any;
  PageIndex: number;
  PageSize: number;
  SortActive: string;
  SortDirection: string;
  Data: TaskListItem[];
}
