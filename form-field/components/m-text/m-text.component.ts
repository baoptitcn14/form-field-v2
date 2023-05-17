import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { Errors, FormField } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-text',
  templateUrl: './m-text.component.html',
  styleUrls: ['./m-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MTextComponent),
      multi: true
    }
  ]
})
export class MTextComponent extends MBaseInput implements Validator {
  @Input() itemData: FormField | undefined;
  @Input() inputSize: string | undefined;
  @Input() rootId: string | undefined;

  errors: Errors | undefined;

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.itemData) {
      this.errors = this.baseValidate(this.itemData, control.value, this.rootId);
      this.proccessValidEmitter(this.rootId);
      return this.errors ? this.errors : null;
    }
    return null;
  }

  onChangeValue(): void {
    this.handler();

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);

    if (this.itemData?.compairFromRefId && this.rootId) {
      let a = this.formFieldService.allItem[this.rootId].items?.find(e => e.id == this.itemData?.compairFromRefId)

      if (a)
        a.value = null;
    }
  }
}