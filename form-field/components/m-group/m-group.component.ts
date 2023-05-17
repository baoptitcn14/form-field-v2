import { Component, Input, OnInit } from '@angular/core';
import { FormField } from 'src/app/form-field/form-field';

@Component({
  selector: 'm-group',
  templateUrl: './m-group.component.html',
  styleUrls: ['./m-group.component.scss']
})
export class MGroupComponent implements OnInit {
  @Input('itemData') groupData: FormField | undefined;
  @Input() rootId: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
