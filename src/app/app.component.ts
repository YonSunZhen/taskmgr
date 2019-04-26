import { Component } from '@angular/core';
//切换主题时让对话框和菜单弹出框也生效OverlayContainer应用于全局
import {OverlayContainer} from '@angular/cdk/overlay';
import { RouterOutlet } from '@angular/router';
import { slideToRight } from './animation/router.anim'
// import { animation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideToRight ]
})
export class AppComponent {

  isDarkTheme = false;

  constructor(private oc: OverlayContainer) { 

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  //切换主题
  changeDarkTheme(isDark){
    this.isDarkTheme = isDark;
    // this.oc.getContainerElement().classList.add('unicorn-dark-theme');
    // console.log(this.isDarkTheme);
    if(this.isDarkTheme === true){
      this.oc.getContainerElement().classList.add('myapp-dark-theme');
    }else{
      this.oc.getContainerElement().classList.remove('myapp-dark-theme');
    }
  }
  //转场动画
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
