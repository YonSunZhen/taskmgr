import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DragDropService } from '../drag-drop.service';
// import { take } from 'rxjs/Operator';

@Directive({
  selector: '[app-droppable]'
})
export class DropDirective {

  @Input() dragEnterClass: string;
  //这里为什么是数组
  @Input() dropTags: Array<string> = [];
  private data$;
  constructor(
    private el: ElementRef, 
    private rd: Renderer2, 
    private service: DragDropService) {
      // this.data$ = this.service.getDragData().subscribe();有问题
    }

  @HostListener('dragenter', ['$event']) ondragenter(ev: Event) {
    //ev.target表示拖拽的那个元素
    if(this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.dragEnterClass);
    }
  }
  @HostListener('dragover', ['$event']) ondragover(ev: Event) {
    if(this.el.nativeElement === ev.target) {
      
    }
  }
  @HostListener('dragleave', ['$event']) ondragleave(ev: Event) {
    if(this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }
  @HostListener('drop', ['$event']) ondrop(ev: Event) {
    if(this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragEnterClass);
    }
  }

}

