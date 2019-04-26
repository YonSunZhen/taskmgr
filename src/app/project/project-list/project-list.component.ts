import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
//导入要被打开的对话框组件
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { listAnimation } from '../../animation/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [ listAnimation ]
})
export class ProjectListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  // @HostBinding('@routeAnim') state2;

  projects = [
    {
      "id": 1,
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/images/covers/0.jpg"
    },
    {
      "id": 2,
      "name": "自动化测试项目",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/images/covers/1.jpg"
    },
    {
      "id": 3,
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/images/covers/0.jpg"
    },
    {
      "id": 4,
      "name": "自动化测试项目",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/images/covers/1.jpg"
    },
    // {
    //   "name": "自动化测试项目",
    //   "desc": "这是一个企业内部项目",
    //   "coverImg": "assets/images/covers/1.jpg"
    // },
    // {
    //   "name": "自动化测试项目",
    //   "desc": "这是一个企业内部项目",
    //   "coverImg": "assets/images/covers/1.jpg"
    // },
    // {
    //   "name": "企业协作平台",
    //   "desc": "这是一个企业内部项目",
    //   "coverImg": "assets/images/covers/0.jpg"
    // },
    // {
    //   "name": "自动化测试项目",
    //   "desc": "这是一个企业内部项目",
    //   "coverImg": "assets/images/covers/1.jpg"
    // },
    // {
    //   "name": "自动化测试项目",
    //   "desc": "这是一个企业内部项目",
    //   "coverImg": "assets/images/covers/1.jpg"
    // }
  ]

  ngOnInit() {
  }
  //打开新建项目对话框
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent,{
      data: {"title": "新建项目:"}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects, {"id": 5, "name": '一个新项目', "desc": "这是一个新项目","coverImg": "assets/images/covers/0.jpg"}];
    });
  }
  //打开邀请对话框
  openInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent,{
      data: {data: "这是邀请框"}
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  //打开修改项目对话框
  openEditDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent,{
      data: {
        "title": "修改项目:",
        "project": project
      }
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  //打开删除对话框
  openDeleteDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: {
        "title": "删除项目:",
        "content": "确认删除本项目吗？"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.projects = this.projects.filter(p => p.id !== project.id );
      }
    });
  }

}
