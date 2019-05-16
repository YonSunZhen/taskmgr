import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
// import { slideToRight } from '../../animation/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  // animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  //这到底是什么意思？
  // @HostBinding('@routeAnim') state1;

  lists = [
    {
      "id": 1,
      "name": "待办",
      "order": 1,
      "tasks": [
        {
          "id":1,
          "desc":'任务一:去星巴克买杯咖啡1',
          "completed": true,
          "priority": 3,
          "owner": {
            "id": 1,
            "name": "张三",
            "avatar": "users-1"
          },
          "dueDate": new Date(),
          "reminder": new Date()
        },
        {
          "id":2,
          "desc":'任务二:去星巴克买杯咖啡2机会的时候看姐夫好看电视剧符合贷款',
          "completed": false,
          "priority": 2,
          "owner": {
            "id": 2,
            "name": "李四",
            "avatar": "users-2"
          },
          "dueDate": new Date(),
          "reminder": new Date()
        }
      ]  
    },
    {
      "id": 2,
      "name": "进行中",
      "order": 2,
      "tasks": [
        {
          "id":1,
          "desc":'任务三:去星巴克买杯咖啡2',
          "completed": false,
          "priority": 2,
          "owner": {
            "id": 1,
            "name": "张三2",
            "avatar": "users-3"
          },
          "dueDate": new Date(),
          "reminder": new Date()
        },
        {
          "id":2,
          "desc":'任务四:去星巴克买杯咖啡2',
          "completed": true,
          "priority": 1,
          "owner": {
            "id": 2,
            "name": "李四2",
            "avatar": "users-4"
          },
          "dueDate": new Date()
        }
      ]  
    }
  ]

  ngOnInit() {
  }
  //打开新建任务对话框
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
  openDelTaskDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: {
        "title": "删除列表:",
        "content": "确认删除列表吗？"
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  //打开修改列表名称对话框
  openEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent,{
      data: {
        "title": "修改列表名称:",
        "content": "确认删除列表吗？"
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  //打开新建列表对话框
  openNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent,{
      data: {
        "title": "新建列表名称:",
        "content": "确认删除列表吗？"
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
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
