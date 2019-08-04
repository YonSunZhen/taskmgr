import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task, TaskList } from '../domain';
import { Observable, from } from 'rxjs';
import { map, mapTo, mergeMap, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly domain = 'task';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  //GET,根据任务id获取任务详情
  get1(taskListId: string) {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('taskListId', taskListId);
    return this.http
      .get(uri,{
        params:params
      })
  }

  get(id: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('id', id);
    return this.http
      .get(uri,{
        params:params
      })
      .pipe(
        map(res => {
          // console.log('haha');
          // console.log(res);
          return res as Task[];
        })
      )
  }

  //POST,增加任务
  add(task: Task): Observable<Task> {
    task.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(task),{headers: this.headers})
      .pipe(
        map(res => res as Task)
      )
  }

  //PATCH,修改任务详情
  updateDetail(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      remark: task.remark
    }
    return this.http
      .patch(uri, JSON.stringify(toUpdate),{headers: this.headers})
      .pipe(map(res => res as Task))
  }

  //PATCH,修改任务完成状态
  updateCompleted(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      completed: task.completed
    }
    return this.http
      .patch(uri, JSON.stringify(toUpdate),{headers: this.headers})
      .pipe(map(res => res as Task))
  }

  //DELETE,删除任务
  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}`;
    //这样返回的是删除的数据
    return this.http
      .delete(`${uri}/${this.domain}/${task.id}`)
      .pipe(mapTo(task))
  }

  //获取所有任务(如何使用rxjs进行数据扩展和拼接)
  // getByLists(lists: TaskList[]): Observable<any> {
  //   let array = [];
  //   return from(lists)
  //     .pipe(
  //       map(x => {
  //         this.get1(x.id).subscribe(res => {
  //           console.log('2222222');
  //           console.log(res);
  //           return this.get1(x.id);
  //         })
  //       })
  //     )
  // }
  getByLists(lists: TaskList[]): Observable<any> {
    return from(lists)
      .pipe(
        mergeMap((list: TaskList) => this.get1(list.id)),
        reduce((tasks: Task[], t: Task[]) => {
          console.log("2222222");
          console.log([...tasks, ...t]);
          return [...tasks, ...t];
        }, [])
      )
  }


}
