import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  avatar = [];
  private readonly avatarName = 'users-';

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
      dateOfBirth: []
    })
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
    console.log(value);
  }

}
