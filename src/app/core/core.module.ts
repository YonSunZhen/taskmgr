import { NgModule, SkipSelf, Optional } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
// 工具类中加载svg图片用的
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
// 引入工具类加载svg图片
import { loadSvgResources } from '../utils/svg.util';
import { RouterModule } from '@angular/router';
import { QuoteService } from '../services/quote.service';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule
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
  ],
  providers: [
    {
      provide: 'BASE_CONFIG', useValue: {
        'uri': 'http://localhost:3000'
      }
    },
    QuoteService
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
    // 执行加载svg图片的方法
    loadSvgResources(ir,ds);
  }
}
