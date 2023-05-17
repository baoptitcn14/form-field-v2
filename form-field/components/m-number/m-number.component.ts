import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { FormField, Errors, FormulaEmitterInput } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-number',
  templateUrl: './m-number.component.html',
  styleUrls: ['./m-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MNumberComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MNumberComponent),
      multi: true
    }
  ]
})

export class MNumberComponent extends MBaseInput implements Validator {
  @Input() itemData: FormField | undefined;
  @Input() inputSize: string | undefined;
  @Input() rootId: string | undefined;
  errors: Errors | undefined;

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.itemData) return null;

    this.errors = this.baseValidate(this.itemData, control.value);

    if (this.itemData?.min != undefined) {
      if (parseFloat(control.value) < parseFloat(this.itemData?.min + '')) {
        if (!this.errors) this.errors = { min: undefined };
        this.errors.min = 'Giới hạn nhỏ nhất là ' + this.itemData.min;
        this.addError('min', this.errors.min);
      } else {
        this.deleteErrorByKey('min');
      }
    }

    if (this.itemData?.max != undefined) {
      if (parseFloat(control.value) > parseFloat(this.itemData?.max + '')) {
        if (!this.errors) this.errors = { max: undefined };
        this.errors.max = 'Giới hạn lớn nhất là ' + this.itemData?.max;
        this.addError('max', this.errors.max);
      } else {
        this.deleteErrorByKey('max');
      }
    }

    this.itemData!.valid = this.errors ? false : true;
    this.proccessValidEmitter(this.rootId);
    return this.errors ? this.errors : null;
  }

  onChangeValue(): void {
    this.handler();

    if (this.itemData?.change)
      this.itemData?.change(this.value);

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);
  }
}
