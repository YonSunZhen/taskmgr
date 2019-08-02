import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project, User, Auth } from '../domain';
import { map, mergeMap, count, switchMap, mapTo } from 'rxjs/operators';
import { Observable,from, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly domain = 'user';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
  '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config) { }

  register(user: User): Observable<Auth> {
    user.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams().set('email', user.email);
    return this.http
      .get(uri, {params})
      .pipe(
        switchMap(res => {
          if((<User[]>res).length > 0) {
            console.log("这里是测试用的");
            console.log(res);
            return throwError('user existed');
          }else{
            return this.http
            .post(uri, JSON.stringify(user), {headers: this.headers})
            .pipe(
              map(r => ({token: this.token, user: <User>r})) //<User>r 这里表示什么意思？
            )
          }
        })
      )
  }

  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('email', username)
      .set('password', password);
    return this.http
      .get(uri, {params})
      .pipe(
        map(res => {
          if((<User[]>res).length === 0) {
            throw new Error('username or password not match');
          }else{
            return {
              token: this.token,
              user: <User>res[0]
            }
          }
        })
      )
  }
}
