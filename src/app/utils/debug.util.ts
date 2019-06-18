import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// declare module 'rxjs' {
//   interface Observable<T> {
//     debug: (...any) => Observable<T>;
//   }
// }

//(ev) => console.log(ev)
// const debug1 = (message: string) => <T>(source: Observable<T>) =>
//   source.pipe(
//     do(ev => console.log(ev))
//   );

export const debug = (message: string) => <T>(source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(x) {
        if (!environment.production) {
          console.log(message,x);
          observer.next(x);
        }
      },
      error(err) { 
        if (!environment.production) {
          console.error('ERROR>>',message, err);
          observer.error(err);
        }
      },
      complete() {
        if (!environment.production) {
          console.log('Completed - ');
          observer.complete();
        }
      }
    })
  });

// exports.module = {
//   debug
// }

// Observable.prototype.debug = function(message: string) {
//   return this.do(
//     (next) => {
//       if(!environment.production) {
//         console.log(message,next);
//       }
//     },
//     (err) => {
//       if(!environment.production) {
//         console.error('ERROR>>',message, err);
//       }
//     },
//     () => {
//       if(!environment.production) {
//         console.log('Completed - ');
//       }
//     }
//   );
// }