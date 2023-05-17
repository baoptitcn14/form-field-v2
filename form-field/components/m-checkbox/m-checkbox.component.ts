import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { Errors, FormField } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-checkbox',
  templateUrl: './m-checkbox.component.html',
  styleUrls: ['./m-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MCheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MCheckboxComponent),
      multi: true
    }
  ]
})
export class MCheckboxComponent extends MBaseInput implements Validator {
  @Input() itemData: FormField | undefined;
  @Input() rootId: string | undefined;
  @Input() labelText: string | undefined;
  @Output() valueChangeEmitter = new EventEmitter();

  errors: Errors | undefined;

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.baseValidate(this.itemData, control.value);
    return this.errors ? this.errors : null;
  }

  onChangeValue() {
    this.handler();
    this.valueChangeEmitter.emit(this.itemData?.value);
  }

}
