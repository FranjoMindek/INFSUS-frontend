import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataType, FormDialogData } from '../../../data/types/FormDialogData';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CodebooksService } from '../../../data/services/codebooks.service';


@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
})
export class FormDialogComponent {
  formType = DataType;
  dialogForm: FormGroup;
  controlIndex: number[];

  // codebooks$: Observable<Codebooks> = this.codebookService.getCodebooks();

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: FormDialogData,
    private formBuilder: FormBuilder,
    private codebookService: CodebooksService,
  ) {
    this.controlIndex = [];
    this.dialogForm = this.formBuilder.group({
      formArray: this.formBuilder.array([]),
    });
    for (let i = 0; i < this.inputData.formInfo.length; i++) {
      const column = this.inputData.formInfo[i];
      let newValidators = [...(column.validators || [])];
      if (i === 0) {
        this.controlIndex[i] = 0;
      } else {
        this.controlIndex[i] = this.controlIndex[i - 1] + 1;
      }
      if (column.type === DataType.DATE_RANGE) {
        this.formArray.push(new FormControl(column.valueTo!, newValidators));
        this.formArray.push(new FormControl(column.valueFrom!, newValidators));
        this.controlIndex[i] += 1;
      } else {
        this.formArray.push(new FormControl(column.value, newValidators));
      }
    }
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
      if (column.type === DataType.DATE_RANGE) {
        let valueFrom = values[this.controlIndex[i]];
        let valueTo = values[this.controlIndex[i] - 1];
        // if (typeof valueFrom === 'object') {
        //   console.log(valueFrom._d);
        //   valueFrom = valueFrom._d.toISOString();
        // }
        // if (typeof valueTo === 'object') {
        //   valueTo = valueTo._d;
        // }
        returnData[column.from!] = valueFrom;
        returnData[column.to!] = valueTo;
      } else {
        returnData[column.name] = values[this.controlIndex[i]];
      }
    }
    return returnData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    if (this.dialogForm.valid)
      this.dialogRef.close(this.prepareData);
  }
}
