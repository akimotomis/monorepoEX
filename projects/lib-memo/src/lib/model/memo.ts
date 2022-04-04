export interface MemoListItem {
  id: string;
  title: string;
  updatedAt: string;
}
export interface ListControl {
  SelectedRow: any;
  PageIndex: number;
  PageSize: number;
  SortActive: string;
  SortDirection: string;
  Data: MemoListItem[];
}
