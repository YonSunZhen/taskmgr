import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  //点击菜单按钮时将这个点击事件暴露到根组件（toggle）
  //子组件暴露一个 EventEmitter 属性，当事件发生时，子组件利用该属性 emits(向上弹射)事件。父组件绑定到这个事件属性，并在事件发生时作出回应
  @Output() toggle = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

}
