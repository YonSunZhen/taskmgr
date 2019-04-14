import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  avatar = [];

  ngOnInit() {
    this.initAvatar();
  }

  //初始化头像数据(16个头像)
  initAvatar() {
    for(let i = 1; i < 13; i++){
      this.avatar.push('users-'+i);
    }
  }

}
