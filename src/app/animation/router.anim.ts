import { trigger, transition, style, query, animateChild, group, animate, state } from '@angular/animations';

export const slideToRight = trigger('routeAnim',[
  state('project', style({
    'width': '100%', 
    'height': '80%'
  })),
  state('tasklist', style({
    'width': '100%', 
    'height': '80%'
  })),
  transition('project <=> tasklist', [
    style({transform: 'translateX(-100%)',opacity: 0}),
    //group指定要并行运行的一组动画步骤（内部动画）
    group([
      animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
      animate('.3s ease-in', style({opacity: 1}))
    ])
  ]),
  // transition('tasklist => project', [
  //   style({transform: 'translateX(-100%)'}),
  //   group([
  //     animate('.5s ease-in-out', style({transform: 'translateX(0)'})),
  //     animate('2s ease-in', style({opacity: 0}))
  //   ])
  // ]),
  
  // transition('project <=> tasklist',[
  //   style({position: 'relative'}),
  //   query(':enter, :leave', [
  //     style({
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       width: '100%'
  //     })
  //   ]),
  //   query(':enter', [
  //     style({left: '-100%'})
  //   ]),
  //   query(':leave',animateChild()),
  //   group([
  //     query(':leave', [
  //       animate('300ms ease-out', style({left:'100%'}))
  //     ]),
  //     query(':enter', animateChild()),
  //   ]),
  //   query(':enter', animateChild()),
  // ]),

  // transition('* <=> FilterPage', [
  //   style({position: 'relative'}),
  //   query(':enter, :leave', [
  //     style({
  //       position: 'absolute',
  //       top: 0,
  //       left: 0,
  //       width: '100%'
  //     })
  //   ]),
  //   query(':enter', [
  //     style({left: '-100%'})
  //   ]),
  //   query(':leave', animateChild()),
  //   group([
  //     query(':leave', [
  //       animate('200ms ease-out', style({left:'100%'}))
  //     ]),
  //     query(':enter', [
  //       animate('300ms ease-out', style({left:'0%'}))
  //     ])
  //   ]),
  //   query(':enter', animateChild())
  // ])
])