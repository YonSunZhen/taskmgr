import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  lists = [
    {
      "id": 1,
      "name": "待办",
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
      "tasks": [
        {
          "id":1,
          "desc":'任务一:去星巴克买杯咖啡2',
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
          "desc":'任务二:去星巴克买杯咖啡2',
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
      data: {"data":"haha"}
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  //打开移动列表对话框
  openCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent,{
      data: {
        lists: [
          {
            "name":"列表一",
            "value":1
          },
          {
            "name":"列表二",
            "value":2
          }
        ]
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
