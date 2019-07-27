import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from '../domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  get(id: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('id', id);
    return this.http
      .get(uri,{
        params:params
      })
      .pipe(
        map(res => res as Task[])
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
}
