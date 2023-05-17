import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { FormFieldService } from 'src/app/form-field/form-field.service';
import { FormField, Errors } from 'src/app/form-field/form-field';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-select',
  templateUrl: './m-select.component.html',
  styleUrls: ['./m-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MSelectComponent),
      multi: true
    }
  ]
})
export class MSelectComponent extends MBaseInput implements Validator {

  @Input() itemData: FormField | undefined;
  @Input() rootId: string | undefined;
  @Input() inputSize: string | undefined;

  errors: Errors | undefined;
  search: string | undefined;

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.errors = this.baseValidate(this.itemData, control.value);

    if (this.rootId)
      this.proccessValidEmitter(this.rootId);
    return this.errors ? this.errors : null;
  }

  // onSelectAll() {
  //   if (this.value) {
  //     this.value = undefined;
  //     this.handler();

  //     if (this.itemData?.formulaRefIds && this.rootId)
  //       this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);

  //     if (this.itemData?.dataSourceRefIds && this.rootId)
  //       this.referenceIdsEmitter(this.itemData, this.rootId);
  //   }
  // }

  onSelectEmpty() {
    this.value = undefined;
    this.handler();

    if (this.itemData?.change)
      this.itemData?.change(this.value);

    if (this.itemData?.dataSourceRefIds && this.rootId)
      this.referenceIdsEmitter(this.itemData, this.rootId);

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);
  }

  onSelect(option: any) {

    this.value = option.id;

    this.handler();

    if (this.itemData?.change)
      this.itemData?.change(this.value);

    if (this.itemData?.dataSourceRefIds && this.rootId)
      this.referenceIdsEmitter(this.itemData, this.rootId);

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);

  }

  get listOption() {
    if (this.itemData && this.itemData.dataSource) {

      this.itemData.dataSource.forEach(e => {
        if (e.paddingByOrder && e.order != undefined && e.order != null)
          e.classCss = `pl-${((e.order - 1) * 30) + 15}`;
      });

      if (!this.search) return this.itemData.dataSource;

      const dataSource = this.itemData.dataSource;

      return dataSource.filter((e: any) => this.formFieldService
        .toLowerCaseNonAccentVietnamese(e.name)
        .indexOf(this.formFieldService
          .toLowerCaseNonAccentVietnamese(this.search)) > -1);
    }

    return [];
  }

  get displayValue() {
    const dataSource = this.itemData?.dataSource;
    const item = dataSource?.find((e: any) => e.id == this.value);
    if (item) {
      this.itemData?.dataSource?.forEach((e: any) => e.active = false);
      item.active = true;
    } else {
      this.itemData?.dataSource?.forEach((e: any) => e.active = false);
    }
    return item ? item.name : (this.itemData?.selectAll ? 'Tất cả' : '');
  }

}
