export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg: string;
  enabled?: boolean;
  taskLists?: Array<string>;//该项目的所有任务列表
  members?: Array<string>;//该项目的所有成员
}