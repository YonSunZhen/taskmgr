import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IdentityType } from '../../domain/index';

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
  ]
})
export class IdentityInputComponent implements OnInit, ControlValueAccessor {

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
  identity: IdentityType;
  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void { }

  onIdTypeChange(idType) {
    console.log(idType);
  }

  onIdNoChange(idNo) {
    console.log(idNo);
  }

}
