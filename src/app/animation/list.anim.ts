import { trigger, transition, style, query, animateChild, group, animate, state, stagger } from '@angular/animations';

export const listAnimation = trigger('listAnim',[
  //* => *表示任意状态到任意状态
  //optional: true表示动画设置是可选的
  //stagger表示一个接着一个出现动画的时间间隔，不是同时出现的（交错安排多元素动画的开始时间）
  transition('* => *', [
    query(':enter', style({opacity: 0}), { optional: true }),
    query(':enter', stagger(100, [
      animate('1s', style({opacity: 1}))
    ]), { optional: true }),
    query(':leave', style({opacity: 1}), { optional: true }),
    query(':leave', stagger(100, [
      animate('2s', style({opacity: 0}))
    ]), { optional: true })
  ])
])