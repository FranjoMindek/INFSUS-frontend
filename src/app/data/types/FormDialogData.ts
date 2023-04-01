import { ValidatorFn } from '@angular/forms';

export /*const*/ enum FormType {
  STRING,
  NUMBER,
  DATE,
  DATE_RANGE,
  CURRENCY
}

export enum FormActions {
  INSERT,
  UPDATE,
  DELETE
}

export type FormDialogData = {
  title: string,
  formInfo: {
    name: string,
    type: FormType,
    value?: any,
    validators?: ValidatorFn[],
  }[],
}
