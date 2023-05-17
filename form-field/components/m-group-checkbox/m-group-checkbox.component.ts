import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { FormField, Errors } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-group-checkbox',
  templateUrl: './m-group-checkbox.component.html',
  styleUrls: ['./m-group-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MGroupCheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MGroupCheckboxComponent),
      multi: true
    }
  ]
})
export class MGroupCheckboxComponent extends MBaseInput implements Validator {

  @Input() itemData: FormField | undefined;
  @Input() rootId: string | undefined;

  errors: Errors | undefined;

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.errors = this.baseValidate(this.itemData, control.value);
    this.proccessValidEmitter(this.rootId);
    return this.errors ? this.errors : null;
  }

  onChangeValue(): void {
    this.value = this.itemData?.items?.filter(e => e.value == true).map(m => m.id);

    if (this.value.length == 0)
      this.value = undefined
    this.handler();
  }

}
