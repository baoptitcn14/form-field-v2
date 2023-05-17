import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { Errors, FormulaEmitterInput, FormField } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';
import { MBaseInputComponent } from '../m-base-input/m-base-input.component';

@Component({
  selector: 'm-date',
  templateUrl: './m-date.component.html',
  styleUrls: ['./m-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MDateComponent),
      multi: true
    }
  ]
})
export class MDateComponent extends MBaseInput implements Validator {
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

  clear() {
    if (!this.value) return;
    this.value = undefined;
    this.onChangeValue();
  }

  onChangeValue(): void {
    this.handler();

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);
  }
}
