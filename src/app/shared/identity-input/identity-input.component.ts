import { Component, OnInit, OnDestroy, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IdentityType, Identity } from '../../domain/index';
import { Subject, Observable, combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  identityTypes = [
    {
      value: IdentityType.IdCard, label: '身份证'
    },
    {
      value: IdentityType.Insurance, label: '医保'
    },
    {
      value: IdentityType.Passport, label: '护照'
    },
    {
      value: IdentityType.Military, label: '军官证'
    },
    {
      value: IdentityType.Other, label: '其他'
    }
  ];
  identity: Identity = {identityNo: null, identityType: null};

  private _idType = new Subject<IdentityType>(); // subject既可以作为Observable也可作为asObservable
  private _idNo = new Subject<string>()
  private propagateChange = (_: any) => {};
  private sub: Subscription;
  constructor() { }

  ngOnInit() {
    const val$ = combineLatest(this.idNo, this.idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      };
    });
    this.sub = val$.subscribe(id => {
      // 将变化的值发送到父组件
      this.propagateChange(id);
    })
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    // 将外部传进来的值绑定到组件
    if(obj) {
      this.identity = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  onIdTypeChange(idType: IdentityType) {
    // 每次值变化时间数据发送出去
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    // 每次值变化时间数据发送出去
    this._idNo.next(idNo);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  // 验证函数，暂时不知道有什么用
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if(!val) {
      return null;
    }
    switch (val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Insurance:
      default:{
        return null;
      }     
    }
  }
  // 验证身份证
  validateIdCard(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 18) {
      return {idInvalid: true};
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }
  // 验证军官证
  validateMilitary(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 18) {
      return {idInvalid: true};
    }
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }
  // 验证护照
  validatePassport(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 9) {
      return {idInvalid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : {idNotValid: true};
  }

}
