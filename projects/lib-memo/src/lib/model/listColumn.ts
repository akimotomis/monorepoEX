export interface ListColumn {
  def: string;
  name: string;
}

const TASK_COLUMN_ALL: ListColumn[] = [
  { def: 'id', name: 'id' },
  { def: 'status', name: 'status' },
  { def: 'title', name: 'title' },
  { def: 'content', name: 'content' },
  { def: 'createdAt', name: '作成日' },
  { def: 'updatedAt', name: '更新日' },
  { def: 'delete', name: '削除' },
];
const TASK_COLUMN_MINI: ListColumn[] = [
  { def: 'id', name: 'Task-id' },
  { def: 'title', name: 'Title' },
  { def: 'createdAt', name: '作成日' },
  { def: 'updatedAt', name: '更新日' },
  { def: 'delete', name: '削除' },
];
const MEMO_COLUMN_MINI: ListColumn[] = [
  { def: 'id', name: 'No' },
  { def: 'title', name: 'Title' },
  { def: 'updatedAt', name: '更新日' },
  { def: 'delete', name: '削除' },
];

export const TASK_COLUMN = {
  all: {
    data: TASK_COLUMN_ALL,
  },
  mini: {
    data: TASK_COLUMN_MINI,
  },
};
export const MEMO_COLUMN = {
  mini: {
    data: MEMO_COLUMN_MINI,
  },
};
