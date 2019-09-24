import { Component,  forwardRef, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/domain';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipListComponent),
      multi: true
    },
  ]
})
export class ChipListComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() placeholderText: string = '请输入成员email';
  @Input() multiple:boolean;//是否可以多选,默认不可以(true可多选false不可多选)
  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;
  form: FormGroup;
  isDisabled: boolean;//是否启用输入框(true不可用false可用)
  // get isDisabled() {
  //   return this.multiple || this.items.length === 0;
  // }
  memberResults$: Observable<User[]>;
  items: Array<User> = [];//已选中的了
  
  constructor(private fb:FormBuilder, private service: UserService) { }
  private propagateChange = (_: any) => {};

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    })
    this.isDisabled = !this.multiple && this.items.length > 0? true:false;
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(s => s && s.length > 1),
        switchMap(str => this.service.searchUsers(str))
      )
  }

  //这是首次载入时才执行还是？
  writeValue(obj: any): void {
    // if(obj) {
    //   for(let i = 0; i < obj.length; i++) {
    //     this.items.push(obj[i]);
    //   }
    // }
    // if(!this.multiple) {
    //   if(this.items.length == 1) {
    //     this.isDisabled = true;
    //   }
    // }
    if(this.multiple) {
      // console.log('444444');
      // const userEntities = obj.reduce((e,c) => ({...e,c}), {});
      // console.log(userEntities);
      // const remaining = this.items.filter(item => !userEntities[item.id]);
      // console.log('555555');
      // console.log(remaining);
      //扩展运算符针对的是数组
      // this.items = [...remaining, ...obj];
      for(let i = 0; i < obj.length; i++) {
        this.items.push(obj[i]);
      }
    }else{
      
      this.items = [...obj];
      if(this.items.length == 1) {
        this.isDisabled = true;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  //点击删除
  removeMember(name: string) {
    // console.log("点击了删除");
    let index = -1;
    for(let i = 0; i < this.items.length; i++) {
      //如果要删除的项刚好在items中的话
      if(this.items[i].name === name) {
        index = i;
      }
    }
    if (index > -1) {
      this.items.splice(index, 1);
      //如果是不可以多选
      if(!this.multiple) {
        if(this.items.length == 0) {
          this.isDisabled = false;
        }
      }
      // this.form.patchValue({memberSearch: ''});
      this.propagateChange(this.items);
    }
    
  }

  handleMemberSelection(event: MatAutocompleteSelectedEvent) {
    //存在就不管
    //不存在就加入
    let state = 0;//表示不存在
    const selectedItem = event.option.value;
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].id === selectedItem.id) {
        state = 1
      }
    }
    //如果选择的是不存在的
    if(!state) {
      //如果是不可多选
      if(!this.multiple) {
        this.items.push(selectedItem);  
        this.isDisabled = true;
        this.memberInput.nativeElement.value = '';//将输入框的内容清除
        this.propagateChange(this.items);
      }else{
        this.items.push(selectedItem); 
        this.memberInput.nativeElement.value = '';//将输入框的内容清除
        this.propagateChange(this.items);
        // this.form.patchValue({memberSearch: selectedItem.name});
      }
    }else{
      this.memberInput.nativeElement.value = '';//将输入框的内容清除
      return;
    }
    
  }

  validate(c: FormControl): {[key: string]: any} {
    return this.items ? null : {
      chipListInvalid: true
    };
  }


}
