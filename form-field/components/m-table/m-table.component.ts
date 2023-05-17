import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DataSource, FormField, HeaderTable, TButton, TRecords } from 'src/app/form-field/form-field';

@Component({
  selector: 'm-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss']
})
export class MTableComponent implements OnInit {
  @Input() itemData: FormField | undefined;
  @Output() onTButtonClickEvent = new EventEmitter<IDataOpenModal>();

  search = '';
  // flagMultiSearch: boolean | undefined;
  // t_records: TRecords[] | undefined = [];
  // t_headers: HeaderTable[] | undefined = []


  readonly TYPE_COLUMN = {
    TEXT: 'text',
    I_TEXT: 'i_text',
    I_NUMBER: 'i_number'
  }

  constructor(
  ) { }

  ngOnInit(): void {
    // if (this.itemData) {
    //   this.t_headers = this.itemData.t_headers;
    //   this.t_records = this.itemData.t_records;
    // }
  }

  get listRecord() {
    if (this.itemData) {
      let s: TRecords[] | undefined = this.itemData.t_records;
      if (this.itemData?.t_filters?.list && this.itemData?.t_filters?.list.length > 0) {
        const p = this.itemData.t_filters.list.filter(e => e.value).map(e => {
          return {
            key: e.key,
            value: e.value
          }
        });

        if (p.length == 0 && !this.search) return this.itemData.t_records;

        s = this.itemData.t_records?.filter((z: any) => {
          let count = 0;
          p.forEach(x => {
            count += (x.key && x.value) && (z.value[x.key] + '' == x.value) ? 1 : 0;
          });
          if (count == p.filter(e => e.value).length) {
            return z;
          }
        });

      }

      if (this.search) {
        s = this.itemData.t_records?.filter((z: any) => {
          const k = this.itemData?.t_headers?.filter(f => f.type == 'text').map(m => m.key);
          if (k && k.length > 0)
            for (let index = 0; index < k.length; index++) {
              const x = k[index];
              if (z.value[x] && (z.value[x] + '').toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                return z;
              }
            }
          else return z;
        });
      }
      return s;
    }
    return [];
  }

  onClickAction(action: TButton | undefined, data: any | undefined) {
    if (action && action.click)
      action.click(data);
    else {
      this.onTButtonClickEvent.emit({
        data: data,
        action: action
      })
    }
  }

}

export interface IDataOpenModal {
  data?: any;
  action?: TButton;
}