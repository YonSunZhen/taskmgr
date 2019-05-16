import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import { Quote } from '../../domain/quote.model';
//响应式表单必须导入,FormBuilder用于多个group集合
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //这个form跟前面[formGroup]="form"这个得来的
  form: FormGroup;

  //必须先初始化,不然会报错
  quote: Quote = { 
    cn: '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合。',
    en: "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.",
    pic: "/assets/images/quotes/0.jpg"
  };
  constructor(private quoteService$: QuoteService, private fb: FormBuilder) {
    this.quoteService$.getQuote().subscribe((data) => {
      this.quote = data;
      // console.log(this.quote);
    })    
  }

  ngOnInit() {
    //对象中的每个名字都要和表单控件的名字一一对应(一定要初始化)
    this.form = this.fb.group({
      email: ['sun@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['',Validators.required]
    })
    console.log(this.form);
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    // console.log(value);
    // console.log(valid);
  }
  //自定义验证器
  validate(c: FormControl): {[key: string]: any} {
    //只有验证出错时才会返回一个错误的提示对象
    //验证成功返回null
    if(!c.value) {
      return null;
    }
    const pattern = /^sun+/;
    if(pattern.test(c.value)) {
      return null;
    }else{
      return {
        emailNotValid: 'The email must start with sun!'
      }
    }
  }

}
