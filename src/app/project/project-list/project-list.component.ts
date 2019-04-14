import { Component, OnInit, Input } from '@angular/core';
import {MatDialog } from '@angular/material';
//导入要被打开的对话框组件
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  projects = [
    {
      "name": "企业协作平台",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/images/covers/0.jpg"
    },
    {
      "name": "自动化测试项目",
      "desc": "这是一个企业内部项目",
      "coverImg": "assets/images/covers/1.jpg"
    }
  ]

  ngOnInit() {
  }
  //打开对话框
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent,{
      data: {dark: true}
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
