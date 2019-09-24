import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { isValidDate } from 'src/app/utils/date.util';
import { extractInfo, isValidAddr, getAddrByCode } from '../../utils/identity.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  avatar = [];
  private readonly avatarName = 'users-';
  sub: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //随机选择每次进入页面的头像
    const img = `${[this.avatarName]}${Math.floor(Math.random() * 16).toFixed(0)}`;
    this.initAvatar();
    // console.log(img);
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: [],
      identity: [],
      address: []
    });
    // const id$ = this.form.get('identity').valueChanges.pipe(
    //   debounceTime(300)
    // );
    const id$ = this.form.get('identity').valueChanges;
    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo); 
      if(isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
        // 重新计算控件的值和校验状态
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      if(isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
        this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
    })
      
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  //初始化头像数据(16个头像)
  initAvatar() {
    for(let i = 1; i < 13; i++){
      this.avatar.push('users-'+i);
    }
  }

  onSubmit({value,valid},ev: Event) {
    ev.preventDefault();
    if(!valid) {
      return;
    }
    // console.log('时间为');
    // console.log(value.dateOfBirth);
  }

}
