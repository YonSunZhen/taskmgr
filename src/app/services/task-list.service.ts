import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TaskList } from '../domain';
import { Observable, concat, merge } from 'rxjs';
import { map, mapTo, reduce } from 'rxjs/operators';

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
  //PATCH(修改列表名称)
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
  //PATCH(修改列表排序)处理两条流
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    //交换拖拽对象和目标对象的order
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({order: target.order}),{headers: this.headers})
      .pipe(
        map(res => res as TaskList)
      )
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({order: src.order}),{headers: this.headers})
      .pipe(
        map(res => res as TaskList)
      )
    //合并两条流(不太明白？)reduce中第二个参数表示初始化这个值
    //prev 表示上一次调用回调时的返回值，或者初始值 init;
		//cur 表示当前正在处理的数组元素；
    return merge(drag$,drop$).pipe(
      reduce((prev:TaskList[],cur: TaskList) => {
        return [...prev,cur];
      },[])
    )
  }
}

  
