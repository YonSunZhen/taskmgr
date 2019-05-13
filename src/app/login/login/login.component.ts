import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //必须先初始化,不然会报错
  quote: Quote = { 
    cn: '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合。',
    en: "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.",
    pic: "/assets/images/quotes/0.jpg"
  };
  constructor(private quoteService$: QuoteService) {
    this.quoteService$.getQuote().subscribe((data) => {
      this.quote = data;
      console.log(this.quote);
    })    
  }

  ngOnInit() {
  }

}
