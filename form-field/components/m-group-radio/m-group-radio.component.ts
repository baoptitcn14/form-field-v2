import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { FormField, Errors } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-group-radio',
  templateUrl: './m-group-radio.component.html',
  styleUrls: ['./m-group-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MGroupRadioComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MGroupRadioComponent),
      multi: true
    }
  ]
})
export class MGroupRadioComponent extends MBaseInput implements Validator {
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
    this.handler();
  }

}
