import { Component, OnInit, forwardRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Address } from 'src/app/domain';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();
  provinces$: Observable<string>;
  cities$: Observable<string>;
  districts$: Observable<string>;
  sub: Subscription;
  private propagateChange = (_: any) => {};
  constructor() { }

  ngOnInit() {
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
    this.provinces$ = of(getProvinces());
    this.cities$ = this.provinces$.pipe(map(p => getCitiesByProvince(p)));
    this.districts$ = combineLatest(this.provinces$,this.cities$).pipe(
      map((p, c) => getAreaByCity(p, c))
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  writeValue(obj: Address): void {
    if(obj) {
      this._address = obj;
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

}
