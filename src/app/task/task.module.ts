import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskHeaderComponent } from './task-header/task-header.component';

@NgModule({
  declarations: [
    TaskHomeComponent, 
    TaskListComponent, 
    TaskItemComponent,
    TaskHeaderComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TaskModule { }
