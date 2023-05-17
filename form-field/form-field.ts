import { MButton } from "./components/m-button/m-button.component";
import { MFilters } from "./components/m-filters/m-filters.component";

export class FormField {
    id: string | undefined;
    index: number | undefined;
    name: string | undefined;
    key: string | undefined;
    type: "form" | "group" | "text" | "number" | "select" | "multiple-select" | "date" | "date-range" | "table" | "checkbox" | "radio" | "group_radio" | "group_checkbox" | "file" | "tabs" | undefined;
    value?: any;
    class?: string;
    disabled?: any = false;
    readonly?: boolean = false;
    required?: boolean = false;
    valid?: boolean = true;
    hiddenText?: boolean = false;
    hidden?: boolean = false;
    icon?: string;
    formulaRefIds?: string[];
    compairWithRefId?: string;
    compairFromRefId?: string;
    inline?: boolean;
    inputName?: string;
    inputSize?: 'sm' | 'md' | 'lg';
    listErrors?: {key: string, message: string}[];
    change?: (value: any) => void;
    unique?: boolean;
    listCheckUnique?: any[];
    // text | number
    regex?: RegExp;
    regexMessageError?: string;
    // text | number
    formular?: string;
    // number
    min?: number;
    max?: number;
    // select
    selectAll?: boolean;
    dataSourceRefIds?: { id: string, key: string }[];
    emptyOption?: boolean;
    // select | table
    search?: boolean;
    dataSource?: DataSource[] | undefined;
    _dataSource?: any[] | undefined;
    items?: FormField[] | undefined;
    // group
    alignName?: "center" | "left" | "right";
    //file
    multiple?: boolean;
    //multiple select
    numberItemShow?: number;
    // table
    t_createButton?: TButton;
    t_actions?: TAction | undefined;
    t_filters?: MFilters | undefined;
    t_headers?: HeaderTable[];
    t_records?: TRecords[];    
}

export interface Errors {
    required?: string | undefined;
    regex?: string | undefined;
    min?: string | undefined;
    max?: string | undefined;
    notMatch?: boolean | undefined;
}

export interface FormulaEmitterInput {
    formulaRefIds: string[] | undefined;
    value: string | number | Date | undefined;
    id: string | undefined;
}

export interface HeaderTable {
    key: string;
    name: string | undefined;
    sort?: boolean;
    class?: string;
    type: 'text' | 'i_text' | 'i_number' | undefined;
    width?: number;
    transformText?: any;
}

export interface TRecords {
    actions?: TButton;
    // { [key: string]: MButton[] };
    value: any;
}

export interface DataSource {
    id?: string;
    name?: string;
    active?: boolean;
    classCss?: string;
    paddingByOrder?: boolean;
    order?: number;
}

export interface TAction {
    css?: any;
    class?: string;
    width?: number;
    list: TButton[];
}

export interface TButton {
    button: MButton;
    type?: 'modal' | 'modalObject' | 'function';
    functionName?: string;
    modalName?: string;
    click?: (data?: any) => void;
}