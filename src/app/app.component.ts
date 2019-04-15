import { Component } from '@angular/core';
//切换主题时让对话框和菜单弹出框也生效
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
}
