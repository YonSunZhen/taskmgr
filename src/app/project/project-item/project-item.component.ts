import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../animation/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [ 
    cardAnim 
  ]
})
export class ProjectItemComponent implements OnInit {

  constructor() { }

  //子组件中必须有声明才能使用父组件传过来的数据
  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  //用于添加动画用的,
  @HostBinding('@card') cardState = 'out';

  ngOnInit() {
  }
  //把一个事件绑定到一个宿主监听器，并提供配置元数据
  @HostListener('mouseenter')
  onmouseenter(){
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onmouseleave(){
    this.cardState = 'out';
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onInviteDelete() {
    this.onDelete.emit();
  }

}
