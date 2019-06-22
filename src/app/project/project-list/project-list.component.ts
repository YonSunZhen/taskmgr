import { Component, OnInit, Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
//导入要被打开的对话框组件
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { listAnimation } from '../../animation/list.anim';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [ listAnimation ]
})
export class ProjectListComponent implements OnInit {

  projects;
  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef,  private projectService$: ProjectService) {
    //获取project列表
    this.projectService$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();//脏值检测？有问题？有什么用?
      console.log('1111111111');
      console.log(this.projects);
    });
  }
  // @HostBinding('@routeAnim') state2;

  ngOnInit() {
    
  }
  //打开新建项目对话框
  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent,{
      //传到对话框的数据
      data: {"title": "新建项目:"}
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      this.projectService$.add(result).subscribe((res) => {
        console.log(res);
        console.log('project添加成功!')
      });
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
