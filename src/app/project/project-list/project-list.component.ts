import { Component, OnInit, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
//导入要被打开的对话框组件
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { listAnimation } from '../../animation/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [ listAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  projects;
  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef,  private projectService$: ProjectService) {
    
  }
  // @HostBinding('@routeAnim') state2;

  ngOnInit() {
    //获取project列表
    this.projectService$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();//脏值检测？有问题？有什么用? 调用此方法会确保即使那些触发器没有被触发，也仍然检查该组件
    });
  }
  //打开新建项目对话框
  openNewProjectDialog() {
    const selectedImg = `/assets/images/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent,{
      //传到对话框的数据
      data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        name: result.name,
        desc: result.desc,
        coverImg: result.coverImg,
        members: ["1"],//先默认为用户1
      }
      this.projectService$.add(data).subscribe((res) => {
        console.log(res);
        if(res.id) {
          console.log('project添加成功!');
          this.projects = [...this.projects, res];
        }    
      });
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
        project: project,
        thumbnails: this.getThumbnails()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = {
        id: project.id,
        name: result.name,
        desc: result.desc,
        coverImg: this.buildImgSrc(result.coverImg)
      }
      this.projectService$.update(data).subscribe((res) => {
        console.log('修改成功!');
        console.log(res);
      })
    });
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
  //获取封面缩略图
  private getThumbnails() {
    return _.range(0,40).map(i => `/assets/images/covers/${i}_tn.jpg`)
  }
  //将小图转化为大图
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
