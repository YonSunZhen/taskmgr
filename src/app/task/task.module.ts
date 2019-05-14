import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';
import { NewTaskListComponent } from './new-task-list/new-task-list.component';

@NgModule({
  declarations: [
    TaskHomeComponent, 
    TaskListComponent, 
    TaskItemComponent,
    TaskHeaderComponent,
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent
  ],
  imports: [
    SharedModule
  ],
  //对话框组件在这里面写,表示一进入这个模块就要进行加载（初始化）,而不是调用时才加载
  entryComponents: [
    NewTaskComponent,
    CopyTaskComponent,
    NewTaskListComponent
  ]
})
export class TaskModule { }
