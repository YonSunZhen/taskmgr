import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { TaskListService } from '../../services/task-list.service';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  // animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private taskListService$: TaskListService) { }
  //这到底是什么意思？
  // @HostBinding('@routeAnim') state1;
  lists;

  ngOnInit() {
    this.taskListService$.get('1').subscribe(lists => {
      this.lists = lists;
    })
  }
  //打开新建任务对话框(增加任务)
  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent,{
      data: {
        "title":"新建任务:"
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  //打开移动列表对话框
  openCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent,{
      data: {
        lists: this.lists
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  //打开修改任务对话框
  openEditTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent,{
      data: {
        "title":"修改任务:",
        "task":task
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  //打开删除列表对话框
  openDelTaskDialog(list) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: {
        "title": "删除列表:",
        "content": "确认删除列表吗？"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.taskListService$.del(list).subscribe(res => {
          console.log('成功删除列表!');
          console.log(res);
        })
      }
    });
  }

  //打开修改列表名称对话框(修改任务列表名)
  openEditListDialog(taskLists) {
    const dialogRef = this.dialog.open(NewTaskListComponent,{
      data: {
        "taskLists":taskLists
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        name: result.name,
        id: taskLists.id
      }
      this.taskListService$.update(data).subscribe(res => {
        console.log('成功修改列表名!');
        console.log(res);
      })
    });
  }
  //打开新建列表对话框(增加任务列表)
  openNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent,{
      data: { }
    });
    dialogRef.afterClosed().subscribe((res) => {
      const data = {
        name: res.name,
        order: 3,
        projectId: "1"
      }
      this.taskListService$.add(data).subscribe((res) => {
        if(res.id) {
          console.log('成功添加任务列表!');
        }
      })
    });
  }
  //srcData表示拖动的数据，list表示放下的那个区域的数据
  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }

}
