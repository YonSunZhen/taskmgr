import { trigger, transition, style, query, animateChild, group, animate, state } from '@angular/animations';

export const cardAnim = trigger('card', [
  state('out', style({
    transform: 'scale(1)',
    'box-shadow': 'none'
  })),
  state('hover', style({
    transform: 'scale(1.1)',
    'box-shadow': '3px 3px 5px 6px #ccc'
  })),
  //ease-in 表示动画开始时很慢，然后逐渐加速
  //ease-out 表示快速启动并逐渐减速直到静止
  //ease-in-out 表示开始很慢，中间加速，最后逐渐减速
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out')),
]);