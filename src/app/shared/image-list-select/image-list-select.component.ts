import { Component, Input, forwardRef } from '@angular/core';
//ControlValueAccessor接口充当Angular表单API和DOM中的本机元素之间的桥梁 自定义表单控件
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
 
@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  //让 Angular 能够正常识别我们自定义的 ControlValueAccessor
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() title = '选择';
  @Input() cols = 6;//输入型参数
  @Input() rowHeight = '80px';//每一行的默认高度
  @Input() items: Array<string> = [];
  @Input() useSvgIcon = false;
  @Input() itemWidth = '80px';//图片的宽度

  selected:string;
  constructor() { }
  private propagateChange = (_: any) => {};
  onChange(i) {
    this.selected = this.items[i];
    this.propagateChange(this.selected);//把变化通知给外部(即父组件)具体是怎么传过去的？
    // this.registerOnChange(this.propagateChange);
  }

  //将新值写入元素(初始页面时把控件的值写进表单)
  writeValue(obj: any): void {
    this.selected = obj;
    console.log("write");
    console.log(obj);
  }
  //用来通知外部，组件已经发生变化
  registerOnChange(fn: any): void {
    //这里必须添加，不然外部表单获取不到变化
    this.propagateChange = fn;
    console.log("register");
    console.log(this.selected);
  }

  registerOnTouched(fn: any): void { }

  validate(c: FormControl): {[key:string]: any} {
    return this.selected? null: {
      imageListInvalid : {
        valid: false
      }
    }
  }

}
