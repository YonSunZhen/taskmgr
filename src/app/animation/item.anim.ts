import { trigger, transition, style, query, animateChild, group, animate, state } from '@angular/animations';

export const itemAnim = trigger('item', [
  state('in', style({
    'border-left-width': '3px'
  })),
  state('out', style({
    'border-left-width': '8px'
  })),
  //ease-in 表示动画开始时很慢，然后逐渐加速
  //ease-out 表示快速启动并逐渐减速直到静止
  //ease-in-out 表示开始很慢，中间加速，最后逐渐减速
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out')),
]);