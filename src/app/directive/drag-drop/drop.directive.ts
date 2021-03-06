import { Directive, ElementRef, HostListener, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import { DragDropService, DragData } from '../drag-drop.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[app-droppable]'
})
export class DropDirective {

  @Output() dropped = new EventEmitter<DragData>();
  @Input() dragEnterClass: string;
  //这里为什么是数组,记录拖拽放进的目标元素的类型，['task-item','task-list']
  @Input() dropTags: Array<string> = [];
  //用于存放拖动的元素的数据流，从服务中获取（拖动的时候放在服务中）
  private data$;

  constructor(
    private el: ElementRef, 
    private rd: Renderer2, 
    private service: DragDropService) {
      this.data$ = this.service.getDragData().pipe(take(1));
    }

  @HostListener('dragenter', ['$event']) ondragenter(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    //ev.target表示拖拽的那个元素
    if(this.el.nativeElement === ev.target) {
      // this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
      this.data$.subscribe(dragData => {
        // console.log('dragData:');
        // console.log(dragData);
        // console.log('dropTags:');
        // console.log(this.dropTags);
        if(this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
        }
      })
    }
  }
  @HostListener('dragover', ['$event']) ondragover(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if (this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'all');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'move');
        } else {
          this.rd.setProperty(ev, 'dataTransfer.effectAllowed', 'none');
          this.rd.setProperty(ev, 'dataTransfer.dropEffect', 'none');
        }
      })
    }
  }
  @HostListener('dragleave', ['$event']) ondragleave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
        }
      })
    }
  }
  @HostListener('drop', ['$event']) ondrop(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if(this.el.nativeElement === ev.target) {
      this.data$.subscribe(dragData => {
        if(this.dropTags.indexOf(dragData.tag) > -1) {
          this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
          this.dropped.emit(dragData);
          this.service.clearDragData();
        }
      })
    }
  }

}

