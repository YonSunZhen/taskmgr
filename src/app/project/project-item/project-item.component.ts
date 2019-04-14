import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  constructor() { }

  //子组件中必须有声明才能使用父组件传过来的数据
  @Input() item;

  ngOnInit() {
  }

}
