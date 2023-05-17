import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormField } from '../../form-field';
import { IDataOpenModal } from '../m-table/m-table.component';

@Component({
  selector: 'm-base-input',
  templateUrl: './m-base-input.component.html',
  styleUrls: ['./m-base-input.component.scss']
})

export class MBaseInputComponent {
  @Input() itemData: FormField = {
    id: '',
    key: '',
    index: 0,
    name: '',
    type: undefined
  };
  @Input() rootId: string | undefined;

  @Output() onTButtonClickEvent = new EventEmitter<IDataOpenModal>();

  onTButtonClick(event: any){
    this.onTButtonClickEvent.emit(event);
  }
}
