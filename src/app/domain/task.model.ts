export interface Task {
  id?: string;
  desc: string;
  completed: Boolean;
  priority: number;
  dueDate?: Date;
  reminder?: Date;
  createDate: Date;
  remark: string;
  ownerId: string;
  participantsIds: Array<string>;//参与者
  taskListId: string;//该任务属于什么列表
}