import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
// import { take } from 'rxjs/Operator/take';


export interface DragData {
  tag: string;//标志是什么类型的拖拽（item还是list）
  data: any;
}

@Injectable()
export class DragDropService {

  constructor() { }

  private _dragData = new BehaviorSubject<DragData>(null);

  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  clearDragData() {
    this._dragData.next(null);
  }

}

