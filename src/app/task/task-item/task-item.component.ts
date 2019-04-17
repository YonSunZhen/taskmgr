import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Output() taskClick = new EventEmitter<void>();
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

}
