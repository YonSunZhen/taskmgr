import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable,from } from 'rxjs';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config) { }

  // POST(OK)
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project),{headers: this.headers})
      .pipe(
        map(res => res as Project)
      )
  }

  // PATCH(OK)
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg
    }
    return this.http
      .patch(uri, JSON.stringify(toUpdate),{headers: this.headers})
      .pipe(
        map(res => res as Project)
      )
  }

  // DELETE(级联删除)
  del(project: Project): Observable<Project> {
    const uri = `${this.config.uri}`;
    //先删除关于这个project的任务列表的所有子任务
    const delTasks$ = from(project.taskLists).pipe(
      mergeMap(liestId => this.http.delete(`${uri}/taskLists/${liestId}`)),
      count()
    )
    return delTasks$.pipe(
      switchMap(_ => this.http.delete(`${uri}/${this.domain}/${project.id}`)),
      mapTo(project)
    )
  }

  // GET(OK)
  get(userId: string): Observable<Project[]> {
    // const uri = `${this.config.uri}/${this.domain}?members_like=${userId}`;
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('members_like', userId);
    return this.http
      .get(uri,{
        params:params
      })
      .pipe(
        map(res => res as Project[])
      )
  }
}
