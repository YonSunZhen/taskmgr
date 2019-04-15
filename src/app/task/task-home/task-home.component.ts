import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  constructor() { }

  lists = [
    {
      "id": 1,
      "name": "待办",
      "tasks": [
        {
          "id":1,
          "desc":'任务一:去星巴克买杯咖啡1',
          "owner": {
            "id": 1,
            "name": "张三",
            "avatar": "users-1"
          },
          "dueDate": new Date()
        },
        {
          "id":2,
          "desc":'任务二:去星巴克买杯咖啡2',
          "owner": {
            "id": 2,
            "name": "李四",
            "avatar": "users-2"
          },
          "dueDate": new Date()
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
          "owner": {
            "id": 1,
            "name": "张三2",
            "avatar": "users-3"
          },
          "dueDate": new Date()
        },
        {
          "id":2,
          "desc":'任务二:去星巴克买杯咖啡2',
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

}
