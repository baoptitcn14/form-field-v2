import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormField, Errors } from '../../form-field';
import { FormFieldService } from '../../form-field.service';
import { MBaseInput } from '../m-base-input/m-base-input';

@Component({
  selector: 'm-multiple-select',
  templateUrl: './m-multiple-select.component.html',
  styleUrls: ['./m-multiple-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MMultipleSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MMultipleSelectComponent),
      multi: true
    }
  ]
})
export class MMultipleSelectComponent extends MBaseInput implements Validator {
  @Input() itemData: FormField | undefined;
  @Input() rootId: string | undefined;

  first: boolean = true;
  errors: Errors | undefined;
  search: string | undefined;
  isSelectAll: boolean = false;

  FAKE = 'fake';

  constructor(formFieldService: FormFieldService) {
    super(formFieldService);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.errors = this.baseValidate(this.itemData, control.value);
    this.proccessValidEmitter(this.rootId);
    return this.errors ? this.errors : null;
  }

  onSelectAll() {
    if (this.value === undefined) this.value = [];

    const dataSource = this.itemData?.dataSource;

    this.isSelectAll = !this.isSelectAll;
    dataSource?.forEach((e: any) => e.active = this.isSelectAll);
    this.value = this.isSelectAll
      ? dataSource?.filter(e => e.active)
      : undefined;

    this.handler();

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);

    if (this.itemData?.dataSourceRefIds && this.rootId)
      this.referenceIdsEmitter(this.itemData, this.rootId);
  }

  onSelect(option: any) {

    if (this.value === undefined) this.value = [];

    option.active = !option.active;

    const dataSource = this.itemData?.dataSource;

    this.isSelectAll = dataSource?.every((e: any) => e.active) ? true : false;

    if (Array.isArray(this.value)) {
      if (option.active)
        this.value.push(option);
      else {
        const i = this.value.findIndex(e => e.id == option.id);
        if (i > -1) {
          this.value.splice(i, 1);

          if (this.value.length == 0)
            this.value = undefined;
        }
      }
    }

    this.handler();

    if (this.itemData?.dataSourceRefIds && this.rootId)
      this.referenceIdsEmitter(this.itemData, this.rootId);

    if (this.itemData?.formulaRefIds && this.rootId)
      this.proccessFormulaRefIds(this.itemData.formulaRefIds, this.itemData.id, this.rootId);

  }

  onRemoveOption(index: number) {
    if (this.isSelectAll) this.isSelectAll = false;

    const dataSource = this.itemData?.dataSource;
    let o = dataSource?.find(e => e.id == this.value[index].id);
    if (o) o.active = false;
    this.value.splice(index, 1);
    if (this.value.length == 0) this.value = undefined;

    this.handler();
  }

  in(event: any, dd: HTMLElement, ddm: HTMLElement) {
    if (!dd.classList.contains('show')) {
      dd.classList.add('show');
    }

    if (!ddm.classList.contains('show')) {
      ddm.classList.add('show');
    }
  }

  out(event: any, dd: HTMLElement, ddm: HTMLElement) {

    if (!this.first) {

      if (dd.classList.contains('show')) {
        dd.classList.remove('show');
      }

      if (ddm.classList.contains('show')) {
        ddm.classList.remove('show');
      }
    }
    if (!this.first) this.first = !this.first;
  }

  get listOption() {
    if (!this.search) return this.itemData?.dataSource;
    const dataSource = this.itemData?.dataSource;

    return dataSource?.filter((e: any) => this.formFieldService
      .toLowerCaseNonAccentVietnamese(e.name)
      .indexOf(this.formFieldService
        .toLowerCaseNonAccentVietnamese(this.search)) > -1);
  }

  get listItemShow() {
    let result: any[] = [];
    if (Array.isArray(this.value)) {
      if (this.itemData?.numberItemShow && this.itemData?.numberItemShow < this.value.length) {
        const number = this.itemData?.numberItemShow;
        let i = 0;
        while (i < number) {
          result.push(this.value[i++]);
        }

        result.push({
          id: this.FAKE,
          name: `+ ${(this.value.length - number)}`
        });

        return result;
      }
      return this.value;
    }
    return result;
  }

}
