import { FormControl, FormGroup } from '@angular/forms';

export type FormType<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K] | null>
}>

export interface EmpFilter {
  name: string;
  options: string[];
  defaultValue: string;
}
