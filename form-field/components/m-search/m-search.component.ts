import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'm-search',
  templateUrl: './m-search.component.html',
  styleUrls: ['./m-search.component.scss'],
  providers: [
    {
      useExisting: forwardRef(() => MSearchComponent),
      multi: true,
      provide: NG_VALUE_ACCESSOR
    }
  ]
})
export class MSearchComponent implements ControlValueAccessor {

  value: string = '';

  onChange: ((obj: any) => void) | undefined;

  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  handler() {
    if (this.onChange) this.onChange(this.value);
  }
}
