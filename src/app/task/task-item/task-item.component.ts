import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';
import { itemAnim } from '../../animation/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [ 
    itemAnim 
  ]
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';
  constructor() { }

  ngOnInit() {
  }

  onItemClick() {
    this.taskClick.emit();
  }

  //阻止checkbox的事件冒泡
  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }

  @HostListener('mouseenter')
  onmouseenter(){
    this.widerPriority = 'out';
  }
  @HostListener('mouseleave')
  onmouseleave(){
    this.widerPriority = 'in';
  }


}
