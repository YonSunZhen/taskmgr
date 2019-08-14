import { Component, OnInit, Input, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
//导入要被打开的对话框组件
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { listAnimation } from '../../animation/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { map, filter, switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [ listAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects;
  sub: Subscription;
  constructor(public dialog: MatDialog,private cd: ChangeDetectorRef,  private projectService$: ProjectService) {
    
  }
  // @HostBinding('@routeAnim') state2;

  ngOnInit() {
    //获取project列表
    this.sub = this.projectService$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();//脏值检测？有问题？有什么用? 调用此方法会确保即使那些触发器没有被触发，也仍然检查该组件
    });
  }

  //组件销毁时取消订阅
  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  //打开新建项目对话框(增加项目)
  openNewProjectDialog() {
    const selectedImg = `/assets/images/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent,{
      //传到对话框的数据
      data: {
        thumbnails: this.getThumbnails(),
        img: selectedImg
      }
    });
    dialogRef.afterClosed().pipe(
      //取完一个值就完成流
      take(1),
      //filter过滤一下空值
      filter(n => n),
      //相当于处理数据
      map(val => ({
        ...val, 
        coverImg: this.buildImgSrc(val.coverImg),
        members: ["1"]
      })),
      //合并流再订阅
      switchMap(v => this.projectService$.add(v))
    ).subscribe(result => {
        console.log(result);
        if(result.id) {
          console.log('project添加成功!');
          this.projects = [...this.projects, result];
        }    
    });
  }
  //打开邀请对话框
  openInviteDialog(project) {
    const dialogRef = this.dialog.open(InviteComponent,{
      data: project
    });
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  //打开修改项目对话框(修改项目)
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
  //打开删除对话框(删除项目,还未完成)
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
        //去除点击的那一项
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
