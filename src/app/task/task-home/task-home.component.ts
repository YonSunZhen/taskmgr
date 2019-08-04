import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { TaskListService } from '../../services/task-list.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  // animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, 
              private taskListService$: TaskListService, 
              private taskService$: TaskService,
              private userService$: UserService) { }
  //这到底是什么意思？
  // @HostBinding('@routeAnim') state1;
  lists;

  ngOnInit() {
    this.taskListService$.get('1').subscribe(lists => {
      this.lists = lists;
      //自己的方法(初始化任务列表和列表数据)
      for(let i = 0; i < this.lists.length; i++){
        this.lists[i].tasks = [];
        if(this.lists[i].taskIds.length > 0) {

          for(let j = 0; j < this.lists[i].taskIds.length; j++) {
            this.taskService$.get(lists[i].taskIds[j]).subscribe(task => {
              // console.log('000000');
              // console.log(task);
              const ownerId = task[0].ownerId;
              let data = JSON.parse(JSON.stringify(task[0]));
              this.userService$.getById(ownerId).subscribe(user => {
                data.owner = user[0];
              })
              this.lists[i].tasks.push(data);
            })
          }


        }
      }
      // console.log('0000');
      // console.log(lists);
      // this.taskService$.getByLists(lists).subscribe(res => {
      //   console.log('11111');
      //   console.log(res);
      //   this.lists = res;
      // })
      console.log("成功获取所有子任务");
      console.log(this.lists);
    })
  }
  //打开新建任务对话框(增加任务)
  openNewTaskDialog(listId) {
    const dialogRef = this.dialog.open(NewTaskComponent,{
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      let data = result.task;
      data.completed = false;
      data.ownerId = "1";
      data.taskListId = listId;
      this.taskService$.add(data).subscribe(res => {
        if(res.id){
          // this.taskListService$.update() 这里有点问题，完成了增加任务，但是没能将任务id更新到taskList表中
          console.log('成功添加任务');
          console.log(res);
        }
      })
    });
  }

  //打开修改任务对话框
  openEditTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent,{
      data: {
        "tasks":task
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let type = result.type;
      let data = result.task;
      data.id = task.id;
      if(type === "update") {
        this.taskService$.updateDetail(data).subscribe(res => {
          if(res.id){
            console.log('成功修改任务详情');
            console.log(res);
          }
        })
      }else if(type === "delete") {
        this.taskService$.del(data).subscribe(res => {
          if(res.id){
            console.log('成功删除任务');
            console.log(res);
          }
        })
      }
    });
  }

  //修改任务的完成状态
  handleCompleteTask(task) {
    task.completed = !task.completed;
    this.taskService$.updateCompleted(task).subscribe(res => {
      if(res.id) {
        console.log('成功修改任务状态');
        console.log(res);
      }
    })
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
        console.log(res);
        if(res.id){
          console.log('成功修改列表名!');
        }      
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
        this.taskListService$.swapOrder(srcData.data,list).subscribe((res) => {
          console.log(res);
          if(res.length > 1) {
            console.log("成功修改列表order");
            console.log('handling list');
            const srcList = srcData.data;
            const tempOrder = srcList.order;
            srcList.order = list.order;
            list.order = tempOrder;
          }
        })
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }

}
