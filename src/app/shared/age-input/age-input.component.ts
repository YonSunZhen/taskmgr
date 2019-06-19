import { Component,  forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { map,} from 'rxjs/operators';
import { Observable, combineLatest, merge } from 'rxjs';

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
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor,OnInit {

  form: FormGroup;//这个form对应前面的[formGroup]="form"
  ageUnits = [
    {value: '', label: '岁'},
    {value: '', label: '月'},
    {value: '', label: '天'}
  ];
  private propagateChange = (_: any) => {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: [],
      age: this.fb.group({
        ageNum: [],
        ageUnit: []
      })
    })

    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age.ageNum');
    const ageUnit = this.form.get('age.ageUnit');

    //valueChange,Observable（可观察对象），每当控件的值发生变化时，它就会发出一个事件
    const birthday$ = birthday.valueChanges.pipe(
      map(d => {
        return {data: d, from: 'birthday'}
      })
    );
    const ageNum$ = ageNum.valueChanges;
    const ageUnit$ = ageUnit.valueChanges;
    const age$ = combineLatest(ageNum$,ageUnit$,( n, u) => {
      this.toData({age:n,unit:n})
    }).pipe(
      map(d => ({data:d,from: 'age'}))
    )
    
    const merged$ = merge(birthday$,age$);
    merged$.subscribe(d => {
      //将日期转化成年龄
      const age = this.toAge(d.date);
      if(d.from === 'birthday') {
        if(age.age !== ageNum.value) {
          //更新值
          ageNum.patchValue(age.age,{emitEvent: false});
        }
        if(age.unit !== ageUnit.value) {
          ageUnit.patchValue(age.unit,{emitEvent:false});
        }
        //将变化通知到父组件
        this.propagateChange(d.date);
      }else{
        const ageToCompare = this.toAge(birthday.value);
        if(age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(d.date,{emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    })
  }


  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

}
