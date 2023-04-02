import { ValidatorFn } from '@angular/forms';

export /*const*/ enum DataType {
  STRING,
  NUMBER,
  DATE,
  DATE_RANGE,
  CURRENCY,
  ACTIONS
}

export enum FormActions {
  INSERT,
  UPDATE,
  DELETE
}

export type FormDialogData = {
  title: string,
  formInfo:
    {
      name: string,
      type: Omit<DataType, DataType.DATE_RANGE>,
      value?: any,
      validators?: ValidatorFn[],
      from?: string,
      to?: string,
      valueFrom?: Date,
      valueTo?: Date
    }[]
}
