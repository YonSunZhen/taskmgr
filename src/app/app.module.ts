import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from "./shared/shared.module";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from "./task/task.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
// import { TaskHomeComponent } from './task/task-home/task-home.component';

@NgModule({
  //可声明对象表，那些属于本NgModule的组件、指令、管道
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // TaskHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,//核心模块一定要在这里导入
    SharedModule,
    ProjectModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
