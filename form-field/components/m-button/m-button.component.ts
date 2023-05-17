import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'm-button',
  templateUrl: './m-button.component.html',
  styleUrls: ['./m-button.component.scss']
})
export class MButtonComponent implements OnInit {

  @Input('code') code: string | undefined = '';
  @Input('cssClass') cssClass: string | undefined = '';
  @Input('disabled') disabled: boolean | undefined;
  @Input('text') text: string | undefined = '';
  @Input('icon') icon: string | undefined = '';
  @Input('iconPosition') iconPosition: string | undefined = '';
  @Input('button') button: MButton | undefined = {
    code: 'default'
  };

  @Output('onClickEvent') onClickEvent = new EventEmitter();

  readonly buttonsDefault: MButton[] = [
    {
      code: 'default',
      text: 'default'
    },
    {
      code: 'save',
      icon: 'save',
      iconPosition: 'left',
      text: 'Lưu',
      class: 'btn-primary'
    },
    {
      code: 'edit',
      icon: 'pencil',
      iconPosition: 'left',
      text: 'Sửa',
      class: 'btn-outline-info'
    },
    {
      code: 'add',
      icon: 'plus',
      iconPosition: 'left',
      text: 'Thêm',
      class: 'btn-outline-success'
    },
    {
      code: 'delete',
      icon: 'trash',
      iconPosition: 'left',
      text: 'Xoá',
      class: 'btn-outline-danger'
    },
    {
      code: 'close',
      icon: 'close',
      iconPosition: 'left',
      text: 'Đóng',
      class: 'btn-secondary'
    },
    {
      code: 'confirm-delete',
      icon: 'trash',
      iconPosition: 'left',
      text: 'Xác nhận xoá',
      class: 'btn-danger'
    },
    {
      code: 'back',
      icon: 'arrow-left',
      iconPosition: 'left',
      text: 'Trở lại',
      class: 'btn-outline-secondary'
    },
    {
      code: 'approve',
      icon: 'paper-plane',
      iconPosition: 'left',
      text: 'Trình duyệt',
      class: 'btn-outline-primary'
    },
    {
      code: 'denie',
      icon: 'times-circle',
      iconPosition: 'left',
      text: 'Từ chối',
      class: 'btn-danger'
    },
    {
      code: 'undo',
      icon: 'undo',
      iconPosition: 'left',
      text: 'Quay lại',
      class: 'btn-outline-secondary'
    },
    {
      code: 'refresh',
      icon: 'refresh',
      iconPosition: 'left',
      text: 'Làm mới',
      class: 'btn-outline-secondary'
    },
    {
      code: 'filter',
      icon: 'filter',
      iconPosition: 'left',
      text: 'Lọc',
      class: 'btn-secondary'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    if (this.code
      || (this.button && this.button.default && this.button.code)) {
      const code = this.code ? this.code : this.button?.code;
      const _class = this.button?.class ? this.button?.class : '';
      const disabled = this.button?.disabled ? this.button?.disabled : false;
      this.button = this.buttonsDefault.find(e => e.code == code);

      if (this.button) {
        if (_class)
          this.button.class += ' ' + _class;
        if (disabled)
          this.button.disabled = disabled;
      }
    }
  }

  onClick() {
    this.onClickEvent.emit();
  }

}

export interface MButton {
  code?: 'filter' | 'default' | 'save' | 'edit' | 'add' | 'delete' | 'close' | 'confirm-delete' | 'back' | 'approve' | 'denie' | 'accept' | 'undo' | 'refresh';
  icon?: string;
  iconPosition?: 'left' | 'right' | 'auto';
  text?: string;
  class?: string;
  disabled?: boolean;
  default?: boolean;
  click?: (data?: any) => void;
}