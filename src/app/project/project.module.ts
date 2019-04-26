import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule
  ],
  //声明式组件
  declarations: [
    ProjectListComponent, 
    ProjectItemComponent, 
    NewProjectComponent, 
    InviteComponent
  ],
  //命令式加载的任意组件(入口组件)
  entryComponents: [
    NewProjectComponent, 
    InviteComponent
  ],
  // exports:[
  //   ProjectListComponent
  // ]
})
export class ProjectModule { }
