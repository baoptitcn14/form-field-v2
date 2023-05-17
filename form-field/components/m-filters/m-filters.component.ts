import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MFilter } from '../m-filter/m-filter.component';

@Component({
  selector: 'm-filters',
  templateUrl: './m-filters.component.html',
  styleUrls: ['./m-filters.component.scss']
})
export class MFiltersComponent implements OnInit {

  @Input('filters') filters: MFilters | undefined;
  @Output('onFilterEvent') onFilterEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onFilter() {
    // emit ve table để filter hoặc truy xuất vào service Form để filter
    this.onFilterEvent.emit();
  }

}

export interface MFilters {
  multi: boolean;
  list: MFilter[]
}
