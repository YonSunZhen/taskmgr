import { Injectable, Inject } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quote } from '../domain/quote.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class QuoteService {
  constructor(private http: HttpClient,@Inject('BASE_CONFIG') private config) { }

  getQuote():Observable<Quote> {
    //Math.random()返回大于等于0小于1的随机数，Math.floor向下舍入
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random()*10)}`;
    return this.http.get(uri)
      //.debug('quotes:') //这里有问题this.do 不是一个function
      .pipe(map(res => res as Quote));
  }
}
