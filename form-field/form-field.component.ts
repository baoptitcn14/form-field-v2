import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormFieldService } from './form-field.service';
import { FormField } from './form-field';
import { IDataOpenModal } from './components/m-table/m-table.component';

@Component({
  selector: 'm-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() rootData: FormField | undefined;
  @Input() rootId: string | undefined;

  @Output() onTButtonClickEvent = new EventEmitter<IDataOpenModal>();

  constructor(
    private formFieldService: FormFieldService
  ) { }

  ngOnInit(): void {

    if (this.rootData?.type == 'form') {
      this.formFieldService.initAllItem(this.rootData, this.rootId);

      this.rootData?.items?.forEach(e => {
        if (e.formular && e.value === undefined) {
          e.value = this.formFieldService.getValueByFormula(e.formular, this.rootId);
        }
        if (e.type == 'file' && e.value === undefined) {
          e.value = [];
        }
      });
    }

    this.rootData?.items?.sort(function (x, y) {
      if (x.index === undefined || x.index === null) x.index = 0;
      if (y.index === undefined || y.index === null) y.index = 0;
      return x.index - y.index;
    });

  }

  onTButtonClick(event: any) {
    this.onTButtonClickEvent.emit(event);
  }
}
