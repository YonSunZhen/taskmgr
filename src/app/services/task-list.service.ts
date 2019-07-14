import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  private readonly domain = 'taskList';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config ){ }

  //POST
  add(taskList: TaskList): Observable<TaskList> {
    taskList.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList),{headers: this.headers})
      .pipe(
        map(res => res as TaskList)
      )
  }
  //GET,根据项目id获取任务列表
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('projectId', projectId);
    return this.http
      .get(uri,{
        params:params
      })
      .pipe(
        map(res => res as TaskList[])
      )
  }
  //DELETE
  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}`;
    //这样返回的是删除的数据
    return this.http
      .delete(`${uri}/${this.domain}/${taskList.id}`)
      .pipe(mapTo(taskList))
  }
  //PATCH
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    }
    return this.http
      .patch(uri, JSON.stringify(toUpdate),{headers: this.headers})
      .pipe(
        map(res => res as TaskList)
      )
  }
}

  
