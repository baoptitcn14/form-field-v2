import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormFieldService } from '../form-field.service';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {

  constructor(
    private dom: DomSanitizer,
    private formFieldService: FormFieldService
  ) { }

  transform(value: string, arg: any): unknown {
    if (!arg) return value;

    let cloneValue = this.formFieldService.toLowerCaseNonAccentVietnamese(value);
    const re = new RegExp(this.formFieldService.toLowerCaseNonAccentVietnamese(arg), 'igm');

    const i = cloneValue.indexOf(re.source);

    if(i > -1) {
      const v = (value + '').substring(i, (re.source.length + i));
      value = (value + '').replace(v, `<span class="highlighted-text">${v}<span>`);
    }

    return this.dom.bypassSecurityTrustHtml(value);
  }

}
