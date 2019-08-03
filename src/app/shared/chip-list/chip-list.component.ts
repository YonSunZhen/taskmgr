import { Component,  forwardRef, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder } from '@angular/forms';
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
  memberResults$: Observable<User[]>;
  items: Array<User> = [];//已选中的了
  
  constructor(private fb:FormBuilder, private service: UserService) { }

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

  writeValue(obj: any): void {
    
  }

  registerOnChange(fn: any): void {
    
  }

  registerOnTouched(fn: any): void { }

  //点击删除
  removeMember(name: string) {
    console.log("点击了删除");
    let index = -1;
    for(let i = 0; i < this.items.length; i++) {
      if(this.items[i].name === name) {
        index = i;
      }
    }
    if (index > -1) {
      this.items.splice(index, 1);
    }
    //如果是不可以多选
    if(!this.multiple) {
      if(this.items.length == 0) {
        this.isDisabled = false;
      }
    }
  }

  handleMemberSelection(event: MatAutocompleteSelectedEvent) {
    //存在就不管
    //不存在就加入
    console.log("点击了选中");
    console.log(event.option.value);
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
      }else{
        this.items.push(selectedItem);  
        this.memberInput.nativeElement.value = '';//将输入框的内容清除
        // this.form.patchValue({memberSearch: selectedItem.name});
      }
    }else{
      this.memberInput.nativeElement.value = '';//将输入框的内容清除
      return;
    }
    
  }


}
