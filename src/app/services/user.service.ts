import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User, Project } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable,from, of } from 'rxjs';

@Injectable()
export class UserService {
  private readonly domain = 'user';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config) { }

  //根据用户id获取用户数据
  getById(id: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('id', id);
    return this.http
      .get(uri, {params})
      .pipe(
        map(res => res as User)
      )
  }

  //根据email模糊搜索用户数据
  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email_like': filter}}) 
      .pipe(
        map(res => res as User[])
      )
  }

  //根据projectid获取所有关于此项目的用户数据
  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}}) 
      .pipe(
        map(res => res as User[])
      )
  }

  //添加projectId到projectIds中
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if(projectIds.indexOf(projectId) > -1) {
      return of(user);
    }else{
      projectIds.push(projectId);
      const toUpdate = {
        "projectIds": projectIds
      }
      return this.http
        .patch(uri, JSON.stringify(toUpdate),{headers: this.headers})
        .pipe(
          map(res => res as User)
        )
      }  
  }

  //从projectIds中删除一个projectId
  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if(index === -1) {
      return of(user);
    }else{
      //除去index那一项(包头不包尾)
      const toUpdate = [...projectIds.slice(0,index),...projectIds.slice(index + 1)];
      return this.http
        .patch(uri, JSON.stringify(toUpdate),{headers: this.headers})
        .pipe(
          map(res => res as User)
        )
      }  
  }

  //批量增加多个成员
  // batchUpdateProjectRef(project: Project): Observable<User[]> {

  // }
  
}
