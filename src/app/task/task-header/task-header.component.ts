import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = '';
  @Output() onNewTask = new EventEmitter<void>();
  @Output() onCopyTask = new EventEmitter<void>();
  @Output() onDelTask = new EventEmitter<void>();
  @Output() onEditList = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.onNewTask.emit();
  }
  onCopyTaskClick() {
    this.onCopyTask.emit();
  }
  onDelTaskClick() {
    this.onDelTask.emit();
  }
  onEditListClick() {
    this.onEditList.emit();
  }
}
