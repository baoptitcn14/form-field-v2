import { EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { FormFieldService } from "src/app/form-field/form-field.service";
import { Errors, FormField, FormulaEmitterInput } from "src/app/form-field/form-field";

export class MBaseInput implements ControlValueAccessor {
    isDisabled: boolean = false;
    value: any | any[];
    listErrors: { key: string, message: string }[] = [];

    constructor(protected formFieldService: FormFieldService) { }

    onChange: ((data: any) => void) | undefined;

    writeValue(data: any): void {
        this.value = data;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }

    handler() {
        if (this.onChange) {
            this.onChange(this.value);
        }
    }
    protected proccessFormulaRefIds(formulaRefIds: string[], id: string | undefined, rootId: string) {
        this.formFieldService.onFormulaEmitter({
            formulaRefIds: formulaRefIds,
            id: id,
            value: this.value
        } as FormulaEmitterInput, rootId)
    }

    protected referenceIdsEmitter(itemData: FormField, rootId: string) {
        this.formFieldService.onReferenceIdsEmitter(itemData, rootId);
    }

    // protected proccessCompairWithRefId(compairWithRefId: string, value: string, rootId: string | undefined) {
    //     if(rootId){
    //         let refObject = this.formFieldService.allItem[rootId].find(e => e.id == compairWithRefId);
    //         if(refObject) {
    //             if(refObject.value == value) {
    //                 delete errors?.regex;
    //                 this.deleteErrorByKey('regex');
    //             }else {
    //                 if (!errors) errors = { required: undefined };
    //                 errors.required = 'Không bỏ trống!';
    //                 this.addError('required', 'Không bỏ trống!');
    //             }
    //         }
    //     }
    // }

    protected proccessValidEmitter(rootId: string | undefined) {
        this.formFieldService.setValidForRoot(rootId);
    }

    protected baseValidate(itemData: FormField | undefined, controlValue: any, rootId?: string | undefined) {
        if (!itemData) return undefined;

        let errors: Errors | undefined;
        const value = controlValue;

        if (itemData.required) {
            if (value !== null && value !== undefined && value !== "") {
                delete errors?.required;
                this.deleteErrorByKey('required');
            } else {
                if (!errors) errors = { required: undefined };
                errors.required = 'Không bỏ trống!';
                this.addError('required', 'Không bỏ trống!');
            }
        }

        if (
            (itemData.required && itemData.type == 'text' && itemData.regex)
            || (!itemData.required && value && itemData.type == 'text' && itemData.regex)
        ) {
            let regex = new RegExp(itemData.regex);
            const test = regex.test(value);

            if (!test) {
                const messageError = itemData.regexMessageError ? itemData.regexMessageError : 'Dữ liệu không hợp lệ!';
                if (!errors) errors = { regex: undefined };
                errors.regex = messageError;
                this.addError('regex', messageError);
            } else {
                delete errors?.regex;
                this.deleteErrorByKey('regex');
            }
        }

        if (itemData.compairWithRefId) {
            if (rootId) {
                let refObject = this.formFieldService.allItem[rootId].items?.find(e => e.id == itemData.compairWithRefId);

                if (refObject) {

                    if (refObject.value == value) {
                        delete errors?.regex;
                        this.deleteErrorByKey('regex');
                    } else {
                        if (!errors) errors = { notMatch: false };
                        errors.notMatch = true;
                        this.addError('notMatch', 'Không trùng khớp!');
                    }
                }
            }
        }

        if (itemData.unique && itemData.listCheckUnique) {
            if (itemData.listCheckUnique.findIndex(e => e == value) > -1) {
                const messageError = 'Giá trị đã tồn tại!';
                if (!errors) errors = { regex: undefined };
                errors.regex = messageError;
                this.addError('unique', messageError);
            } else {
                delete errors?.regex;
                this.deleteErrorByKey('unique');
            }
        }

        itemData.valid = errors ? false : true;
        return errors ? errors : undefined;
    }

    protected deleteErrorByKey(key: string) {
        const index = this.listErrors.findIndex(e => e.key == key);
        if (index > -1)
            this.listErrors.splice(index, 1);
    }

    protected addError(key: string, message: string) {
        const index = this.listErrors.findIndex(e => e.key == key);
        if (index < 0)
            this.listErrors.push({
                key: key,
                message: message
            });
    }

}

