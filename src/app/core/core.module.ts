import { NgModule, SkipSelf, Optional } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from '../utils/svg.util';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  //必须将这些组件导出才能在app.component.html中使用这些组件
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  //CoreModule核心模块
  //在构造函数中进行依赖性注入，为了让CoreModule只在系统中加载一次
  //SkipSelf表示去父级里面找依赖
  //Optional第一次加载依赖时CoreModule还不存在，表示可选的
  constructor(@Optional() @SkipSelf() parent: CoreModule,
  ir: MatIconRegistry, 
  ds: DomSanitizer
  ) {
    if (parent) {
      throw  new Error('模块已经存在，不能再次加载!');
    }
    loadSvgResources(ir,ds);
  }
}
