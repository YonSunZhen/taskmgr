export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  projectIds?: Array<string>;//与该用户有关的所有项目
}