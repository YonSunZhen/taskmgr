import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggable][draggedClass]'
})
export class DragDirective {

  private _isDraggable = false;

  //这里具体是怎么执行的？？？
  @Input('app-draggable')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggable() {
    return this._isDraggable;
  }

  @Input() draggedClass: string;
  @Input() dragTag: string;//用于唯一标识是什么类型的拖拽
  @Input() dragData: any;
  constructor(
    private el: ElementRef, 
    private rd: Renderer2, 
    private service: DragDropService) { }

  @HostListener('dragstart', ['$event']) ondragstart(ev: Event) {
    //ev.target表示拖拽的那个元素
    if(this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData});
    }
  }
  @HostListener('dragend', ['$event']) ondragend(ev: Event) {
    if(this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }

}

