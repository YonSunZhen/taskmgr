import { Component, OnInit, forwardRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Address } from 'src/app/domain';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { getProvinces, getCitiesByProvince, getAreaByCity } from 'src/app/utils/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject<string>();
  _city = new Subject<string>();
  _district = new Subject<string>();
  _street = new Subject<string>();
  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  sub: Subscription;
  // provinces = getProvinces();
  private propagateChange = (_: any) => {};
  constructor() { }

  ngOnInit() {
    // console.log(getProvinces());
    // console.log(getCitiesByProvince('广东省'));
    // console.log(getAreaByCity("广东省", "汕头市"));
    const province$ = this._province.asObservable().pipe(startWith(''));
    const city$ = this._city.asObservable().pipe(startWith(''));
    const district$ = this._district.asObservable().pipe(startWith(''));
    const street$ = this._street.asObservable().pipe(startWith(''));
    const val$ = combineLatest([province$, city$, district$, street$]).pipe(
      map(([_p, _c, _d, _s]) => ({
        province: _p,
        city: _c,
        district: _d,
        street: _s
      }))
    );
    this.sub = val$.subscribe(v => {
      this.propagateChange(v);
    });
    // 获取页面的值
    this.provinces$ = of(getProvinces());
    this.cities$ = province$.pipe(map(p => getCitiesByProvince(p)));
    this.districts$ = combineLatest(province$,city$).pipe(
      map(([p, c]) => getAreaByCity(p, c))
    );
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: Address): void {
    if(obj) {
      this._address = obj;   
      if(this._address.province) {
        this._province.next(this._address.province);
      }
      if(this._address.city) {
        this._city.next(this._address.city);
      }
      if(this._address.district) {
        this._district.next(this._address.district);
      }
      if(this._address.street) {
        this._street.next(this._address.street);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): { [key: string]: any } | null {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (
      val.province &&
      val.city &&
      val.district &&
      val.street &&
      val.street.length >= 4
    ) {
      return null;
    }
    return {
      addressNotValid: true
    };
  }
}
