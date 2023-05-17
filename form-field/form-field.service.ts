import { Injectable } from '@angular/core';
import { FormField, FormulaEmitterInput, TRecords } from './form-field';

@Injectable({
  providedIn: 'root'
})
export class FormFieldService {

  allItem: { [key: string]: FormField } = {};

  setDatasource(id: string, rootId: string, source: any[]) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId || allItem[rootId] is undefined');
      return;
    }

    let item = this.allItem[rootId].items?.find(x => x.id == id);

    setTimeout(() => {
      if (item && source)
        item.dataSource = source;
    }, 100)
  }

  getRootById(rootId: string) {
    return this.allItem[rootId];
  }

  getControlById(id: string, rootId: string) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId || allItem[rootId] is undefined');
      return undefined;
    }

    return this.allItem[rootId].items?.find(x => x.id == id);
  }

  getValueByFormula(formular: string | undefined, rootId: string | undefined) {
    if (!formular || !rootId) {
      console.log('rootId || allItem[rootId] is undefined');
      return undefined;
    }

    const arrFormula = formular.split('+');
    let result = '';

    arrFormula?.forEach(c => {
      if (c == '@space') {
        result += ' ';
      } else {
        const v = this.getValueById(c, rootId) as string;
        result += v ? v : c;
      }
    });

    return result;
  }

  getValueById(id: string, rootId: string) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId || allItem[rootId] is undefined');
      return undefined;
    }

    let item = this.allItem[rootId].items?.find(x => x.id == id);

    if (item) {
      const type = typeof (item.value);

      if (type == 'string' || type == "number") {
        return this.getDisplayNameByValue(item, item.value);
      } else if (this.isTypeOfDate(item.value)) {
        return this.formatDate(item.value as Date);
      } else if (item.type == 'date-range' && type === 'object') {
        let result = null;

        if (item.value.start) {
          result = this.formatDate(item.value.start as Date) + ' - ';
        }

        if (item.value.end) {
          result += result ? this.formatDate(item.value.end as Date) : (' - ' + this.formatDate(item.value.end as Date));
        }

        return result;
      }
      return null;
    }

    return null;
  }

  getDisplayNameByValue(item: FormField, value: string | number | Date | undefined) {
    if (value && item.type == 'select') {
      const dataSource = item?.dataSource;
      return dataSource?.find(e => e.id == value)?.name;
    }
    return value;
  }

  setValue(item: FormField, value: any) {
    item.items?.forEach(e => {
      for (var property in value) {
        if (e.key == property)
          e.value = (<any>value)[property];
      }
    });
  }

  // setRecordsForTable(table: FormField, records: any[]) {
  //   table.t_records = records;

  // }

  setRecordsForTable(id: string, rootId: string, records: TRecords[]) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId || allItem[rootId] is undefined');
      return;
    }

    let item = this.allItem[rootId].items?.find(x => x.id == id);

    if (item && records)
      item.t_records = records;
  }

  onReferenceIdsEmitter(itemData: FormField, rootId: string | undefined) {
    if (!rootId) return console.log('rootId is undefined');

    if (itemData.dataSourceRefIds) {
      itemData.dataSourceRefIds.forEach(e => {
        let item = this.allItem[rootId].items?.find(x => x.id == e.id);

        if (item) {
          this.setDataForDataSourceRefIds(item, e.key, itemData.value, rootId);
        }
      });
    }
  }

  onFormulaEmitter(event: FormulaEmitterInput, rootId: string | undefined) {
    if (!rootId) return console.log('rootId is undefined');

    const data = event;

    if (data.formulaRefIds && data.formulaRefIds?.length > 0) {
      data.formulaRefIds.forEach(e => {
        let item = this.allItem[rootId].items?.find(x => x.id == e);
        if (item) {
          item.value = this.getValueByFormula(item.formular, rootId);
        }
      });
    }
  }

  initAllItem(objectData: FormField | undefined, rootId: string | undefined) {
    if (!rootId || !objectData) {
      console.log('objectData || rootId is undefined, not init all item');
      return;
    }

    if (!this.allItem) this.allItem = {};

    const allObjectHasItems = objectData?.items?.filter(e => e.type === 'group' || e.type === 'form' || e.type === 'group_checkbox');
    const allNotGroupOrForm = objectData?.items?.filter(e => e.type !== 'group' && e.type !== 'form' && e.type != 'table');

    if (this.allItem[rootId]) this.allItem[rootId] = {} as any;

    if (objectData.id === rootId) this.allItem[rootId] = objectData;
    // [...(this.allItem[rootId] || []), ...([objectData] || [])];

    // allNotGroupOrForm?.forEach(e => {
    //   if (e && e.id)
    //     this.allItem[rootId][e.id] = e;
    // })

    // [...(this.allItem[rootId] || []), ...(allNotGroupOrForm || [])];

    // allObjectHasItems?.forEach(e => {
    //   this.initAllItem(e, rootId);
    // });
  }

  getResult(obj: FormField, o: any) {
    obj.items?.forEach(e => {
      if (e != undefined && e.key) {
        if (e.type == 'form' || e.type == 'group') {
          o[e.key] = {} as any;
          this.getResult(e, o[e.key]);
        } else if (e.type !== 'table') {
          o[e.key] = e.value;
        }
      }
    });

    return o;
  }

  setValidControl(controlId: string, rootId: string | undefined, value: boolean) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId is undefined, cannot check valid root');
      return;
    }

    let control = this.allItem[rootId].items?.find(e => e.id == controlId);

    setTimeout(() => {
      if (control) {
        control.valid = value;
        this.setValidForRoot(rootId);
      }
      else
        console.log('cannot find control, set valid for control');
    }, 100)
  }

  setValidForRoot(rootId: string | undefined) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId is undefined, cannot check valid root');
      return;
    }

    let root = this.allItem[rootId];

    setTimeout(() => {
      this.onSetValid(root, rootId);
    }, 100)
  }

  setErrorForControl(controlId: string, rootId: string | undefined, error: { key: string, message: string }) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId is undefined, cannot check valid root');
      return;
    }

    let control = this.allItem[rootId].items?.find(e => e.id == controlId);

    // setTimeout(() => {
    if (control) {

      if (!control.listErrors) {
        control.listErrors = [];
      }

      if (control.listErrors.findIndex(e => e.key == error.key) < 0)
        control.listErrors.push(error);
    }
    else
      console.log('cannot find control, set valid for control');
    // }, 100)
  }

  deleteErrorForControl(controlId: string, rootId: string | undefined, errorKey: string) {
    if (!rootId || !this.allItem[rootId]) {
      console.log('rootId is undefined, cannot check valid root');
      return;
    }

    let control = this.allItem[rootId].items?.find(e => e.id == controlId);
    if (control && control.listErrors)
      control.listErrors = control.listErrors.filter(e => e.key != errorKey)
  }

  destroy(id?: string) {
    if (!id)
      this.allItem = {};

    if (id && this.allItem[id]) {
      delete this.allItem[id];
    }
  }

  toLowerCaseNonAccentVietnamese(str: string | undefined) {
    if (!str) return '';

    str = (str + '').toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system enkey vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  //#region private function

  private onSetValid(root: any, rootId: string) {
    root.valid = this.allItem[rootId].items?.filter(e => e.id != rootId).every(e => e.valid == true);
  }

  private setDataForDataSourceRefIds(item: FormField, key: string, valueFilter: string | number | Date | undefined, rootId: string) {
    item.value = undefined;

    if (item.formulaRefIds) {
      this.onFormulaEmitter({
        formulaRefIds: item.formulaRefIds,
        id: item.id,
        value: item.value
      }, rootId);
    }

    if (!valueFilter)
      item.dataSource = item._dataSource;
    else
      item.dataSource = item._dataSource?.filter(z => z[key] == valueFilter);
  }

  private isTypeOfDate(input: any) {
    if (Object.prototype.toString.call(input) === "[object Date]")
      return true;
    return false;
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  //#endregion
}