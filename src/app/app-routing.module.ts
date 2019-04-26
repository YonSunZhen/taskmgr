import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TaskHomeComponent } from './task/task-home/task-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'project', component: ProjectListComponent, data: {animation: 'project'} },
  { path: 'tasklist', component: TaskHomeComponent, data: {animation: 'tasklist'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
