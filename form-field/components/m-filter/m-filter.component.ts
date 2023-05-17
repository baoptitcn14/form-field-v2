import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'm-filter',
  templateUrl: './m-filter.component.html',
  styleUrls: ['./m-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MFilterComponent),
      multi: true
    }
  ]
})
export class MFilterComponent implements OnInit, ControlValueAccessor {

  @Input('filter') filter: MFilter = {
    key: null,
    name: 'default',
    value: null,
    class: null,
    dataSource: [],
    selectAll: true
  }

  @Output('onChangeEvent') onChangeEvent = new EventEmitter();

  onChange: ((data: any) => void) | undefined;

  value: string | undefined | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectAll() {
    this.filter.dataSource.forEach(e => e.active = false);
    
    if (this.onChange) {
      this.value = undefined;
      this.onChange(undefined);
      this.onChangeEvent.emit(undefined);
    }
  }

  onSelect(item: any) {
    if (item.active) return;
    this.filter.dataSource.forEach(e => e.active = false);
    item.active = true;

    if (this.onChange) {
      this.value = item.id;
      this.onChange(item.id);
      this.onChangeEvent.emit(item.id);
    }
  }

  get displayName() {
    const o = this.filter.dataSource.find(e => e.active);
    return o ? o.name : (this.filter.selectAll ? 'Tất cả' : '');
  }

  writeValue(obj: any): void {

    this.value = obj;

    if (this.filter.dataSource) {
      let o = this.filter.dataSource.find(e => e.id == obj);
      if (o) o.active = true;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

}

export interface MFilter {
  key: string | undefined | null;
  name: string;
  value: string | undefined | null;
  class?: string | undefined | null;
  dataSource: any[],
  selectAll?: boolean;
}
