import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { FormField, Errors } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-date-range',
  templateUrl: './m-date-range.component.html',
  styleUrls: ['./m-date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MDateRangeComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MDateRangeComponent),
      multi: true
    }
  ]
})
export class MDateRangeComponent extends MBaseInput implements OnInit, Validator {
  @Input() itemData: FormField | undefined;
  @Input() rootId: string | undefined;

  errors: Errors | undefined;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  ngOnInit(): void {
    this.range.valueChanges.subscribe(res => {
      this.value = res;
      this.onChangeValue();
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.errors = this.baseValidate(this.itemData, control.value);
    this.proccessValidEmitter(this.rootId);
    return this.errors ? this.errors : null;
  }

  clear() {
    if (!this.value) return;
    this.range.get('start')?.setValue(null);
    this.range.get('end')?.setValue(null);
    this.value = undefined;
    this.onChangeValue();
  }

  onChangeValue(): void {
    this.handler();

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);
  }

}
