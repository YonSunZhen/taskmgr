import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//SharedModule作为中间模块
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  //表示导出的模块，之后他、其他模块直接导入SharedModule就行了
  exports: [
    CommonModule
  ]
})
export class SharedModule { }
