import { Component,  forwardRef, OnInit, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { map, debounceTime, startWith, distinctUntilChanged, filter } from 'rxjs/operators';
import { combineLatest, merge, Subscription } from 'rxjs';
import {
  subDays,//获得当前日期之前n天的日期
  subMonths,
  subYears,
  differenceInDays,//获得两个时间相差几天
  differenceInMonths,
  differenceInYears,
  isBefore,//接收两个时间参数,第一个时间是否在第二个时间之前
  parse,//格式化时间格式(Tue Feb 11 2014 11:30:30)
  format//格式化时间格式(02/11/2014)
}from 'date-fns';
import { toDate, isValidDate } from '../../utils/date.util';

//表明单位只能是这三种(为每种单位规定一个范围)
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
  ]
})
export class AgeInputComponent implements ControlValueAccessor,OnInit,OnDestroy {

  @Input() daysBottom = 0;
  @Input() daysTop = 90;
  @Input() monthsBottom = 1;
  @Input() monthsTop = 24;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() dateFormat = 'YYYY-MM-DD'
  @Input() debounceTime = 500;
  form: FormGroup;//这个form对应前面的[formGroup]="form"
  private subBirth: Subscription;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'}
  ];
  // dateOfBirth;//初始化值
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //如果父组件没传值的话就初始化数据
    const initDate = toDate(subYears(Date.now(), 30));
    console.log('77777');
    // console.log(this.dateOfBirth);
    const initAge = this.toAge(initDate);
    this.form = this.fb.group({
      birthday: [initDate,this.validateDate],//validateDate自己写的验证函数
      age: this.fb.group({
        ageNum: [initAge.age],//初始化控件的值
        ageUnit: [initAge.unit]//0年1月2日
      },{validator:this.validateAge('ageNum','ageUnit')})//这个validator跟上面的不太一样
    })

    //获取控件
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    //valueChange,Observable（可观察对象），每当控件的值发生变化时，它就会发出一个事件
    const birthday$ = birthday.valueChanges.pipe(
      map(d => {
        return {date: d, from: 'birthday'}
      }),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter(_ => birthday.valid),//输出验证函数的值
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),//初始化值
      debounceTime(this.debounceTime),//间隔300毫秒后发出指值
      distinctUntilChanged(),//重复值不发送
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const age$ = combineLatest(ageNum$,ageUnit$,(n, u) => 
      this.toDate({age:n,unit:u})
    ).pipe(
      map(d => ({date:d,from: 'age'}))
    )
    //合并两条流
    const merged$ = merge(birthday$,age$).pipe(
      filter(_ => this.form.get('age').valid)
    );
    this.subBirth = merged$.subscribe(d => {
      //将日期转化成年龄
      const age = this.toAge(d.date);
      if(d.from === 'birthday') {
        if(age.age !== ageNum.value) {
          console.log('中间改变了');
          //更新值
          ageNum.patchValue(age.age,{emitEvent: false});
          console.log('中间改变了1');
        }
        if(age.unit !== ageUnit.value) {
          console.log('右边改变了');
          ageUnit.patchValue(age.unit,{emitEvent:false});
          console.log('右边改变了1');
        }
        //将变化通知到父组件
        this.propagateChange(d.date);
      }else{
        const ageToCompare = this.toAge(birthday.value);
        if(age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          console.log('左边改变了');
          console.log(d.date);
          birthday.patchValue(d.date,{emitEvent: false});
          this.propagateChange(d.date);
          console.log(birthday.value);
          console.log('左边改变了1');
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.subBirth) {
      this.subBirth.unsubscribe();
    }
  }

  //外界将初始值写进控件
  writeValue(obj: any): void {
    if(obj) {
      const date = toDate(obj);
      // this.dateOfBirth = date;
      console.log('666666');
      console.log(date);
      this.form.get('birthday').patchValue(date,{emitEvent: true});
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age,{emitEvent: true});
      this.form.get('age').get('ageUnit').patchValue(age.unit,{emitEvent: true});
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  //将选中的时间转为年龄
  toAge(dateStr: string) : Age {
    const date = parse(dateStr);
    const now = Date.now();
    //表示我选中的时间在当前时间的90天前之后就以天为单位
    if(isBefore(subDays(now,this.daysTop),date)) {
      return {
        age: differenceInDays(now,date),
        unit: AgeUnit.Day
      }
    }else{
      if(isBefore(subMonths(now,this.monthsTop),date)) {
        return {
          age: differenceInMonths(now,date),
          unit: AgeUnit.Month
        }
      }else{
        return {
          age: differenceInYears(now,date),
          unit: AgeUnit.Year
        }
      }
    }
  }

  //将年龄转化为日期(出生)
  toDate(age:Age) : string {
    const now = Date.now();
    // const dateFormat = 'YYYY-MM-DD';
    switch (age.unit) {
      case AgeUnit.Year: {
        //当前时间减去几岁获取出生日期
        return format(subYears(now,age.age),this.dateFormat);
      }
      case AgeUnit.Month: {
        return format(subMonths(now,age.age),this.dateFormat);
      }
      case AgeUnit.Day: {
        return format(subDays(now,age.age),this.dateFormat);
      }
      default:{
        return null;
      }
    }
  }
  //组合验证
  validate(c: FormControl) : {[key:string]: any} {
    const val = c.value;
    if(!val) {
      return null;
    }
    if(isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    }
  }
  //验证日期
  validateDate(c: FormControl): {[key:string]: any}{
    const val = c.value;
    //验证通过返回null
    return isValidDate(val) ? null : {
      birthdayInvalid: true
    }
  }
  //验证年龄
  validateAge(ageNumKey: string, ageUnitKey: string){
    return (group: FormGroup) : {[key:string]:any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      const ageUnitVal = ageUnit.value;
      switch (ageUnitVal) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break
        }
        default:{
          break;
        }
      }
      return result ? null : {ageInvalid: true};
    }
  }
}
