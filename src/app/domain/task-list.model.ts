export interface TaskList {
  id?: string;
  name: string;
  order?: number;
  taskIds?: Array<string>;
  projectId?: string;
}