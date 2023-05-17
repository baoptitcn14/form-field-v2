import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//  My Components
import { MGroupComponent } from './components/m-group/m-group.component';
import { MCheckboxComponent } from './components/m-checkbox/m-checkbox.component';
import { MButtonComponent } from './components/m-button/m-button.component';
import { MGroupCheckboxComponent } from './components/m-group-checkbox/m-group-checkbox.component';
import { MGroupRadioComponent } from './components/m-group-radio/m-group-radio.component';
import { MDateRangeComponent } from './components/m-date-range/m-date-range.component';
import { MFilesComponent } from './components/m-files/m-files.component';
import { MTextComponent } from './components/m-text/m-text.component';
import { MNumberComponent } from './components/m-number/m-number.component';
import { MSelectComponent } from './components/m-select/m-select.component';
import { MDateComponent } from './components/m-date/m-date.component';
import { MTableComponent } from './components/m-table/m-table.component';
import { MBaseInputComponent } from './components/m-base-input/m-base-input.component';
import { FormFieldComponent } from './form-field.component';

// pipes
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { MMultipleSelectComponent } from './components/m-multiple-select/m-multiple-select.component';
import { ClickOutSideDirective } from './directives/click-out-side.directive';

// modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MFilterComponent } from './components/m-filter/m-filter.component';
import { MSearchComponent } from './components/m-search/m-search.component';
import { MFiltersComponent } from './components/m-filters/m-filters.component';

@NgModule({
  declarations: [
    // my components
    FormFieldComponent,
    MTextComponent,
    MNumberComponent,
    MSelectComponent,
    MDateComponent,
    MTableComponent,
    MBaseInputComponent,
    MGroupComponent,
    MCheckboxComponent,
    MButtonComponent,
    MGroupCheckboxComponent,
    MGroupRadioComponent,
    MDateRangeComponent,
    MFilesComponent,
    MMultipleSelectComponent,

    // pipe
    HighlighterPipe,

    //directives
    ClickOutSideDirective,
      MFilterComponent,
      MSearchComponent,
      MFiltersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // material modules
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  exports: [
    FormFieldComponent,
    MButtonComponent,
    MSelectComponent,
    MCheckboxComponent
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
  ]
})
export class FormFieldModule { }
