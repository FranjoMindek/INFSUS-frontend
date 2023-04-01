import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialogData, FormType } from '../../../data/types/FormDialogData';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
})
export class FormDialogComponent {
  formType = FormType;
  dialogForm: FormGroup;
  controlIndex: number[];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: FormDialogData,
    private formBuilder: FormBuilder) {
    this.dialogForm = this.formBuilder.group({
      formArray: this.formBuilder.array([]),
    });
    this.controlIndex = [];
    for (let i = 0; i < this.inputData.formInfo.length; i++) {
      const column = this.inputData.formInfo[i];
      let newValidators = [...(column.validators || [])];
      if (i === 0) {
        this.controlIndex[i] = 0;
      } else {
        this.controlIndex[i] = this.controlIndex[i - 1] + 1;
      }
      if (column.type === FormType.DATE_RANGE) {
        this.formArray.push(new FormControl(column.value, newValidators));
        this.formArray.push(new FormControl(column.value, newValidators));
        this.controlIndex[i] += 1;
      } else {
        this.formArray.push(new FormControl(column.value, newValidators));
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    if (this.dialogForm.valid)
      this.dialogRef.close(this.prepareData);
  }

  get formArray() {
    return this.dialogForm.get('formArray') as FormArray;
  }

  get prepareData() {
    console.log(this.dialogForm);
    const returnData: any = {};
    const values = this.formArray.value as any[];
    for (let i = 0; i < this.inputData.formInfo.length; i++) {
      const column = this.inputData.formInfo[i];
      if (column.type === FormType.DATE_RANGE) {
        returnData[column.name] = {
          start: values[this.controlIndex[i]],
          end: values[this.controlIndex[i] - 1],
        };
      } else {
        returnData[column.name] = values[this.controlIndex[i]];
      }
    }
    return returnData;
  }
}
