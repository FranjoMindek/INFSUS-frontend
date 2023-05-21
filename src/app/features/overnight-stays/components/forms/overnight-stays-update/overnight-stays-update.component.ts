import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { OvernightStay, OvernightStayUpdate } from '../../../../../data/types/OvernightStay';

@Component({
  selector: 'app-overnight-stays-update',
  templateUrl: './overnight-stays-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvernightStaysUpdateComponent {

  codebooks$ = this.codebooksService.getCodebooks('overnightStayStatuses', 'rooms');

  form = this.fb.group({
    roomId: [String(this.inputData.roomId), Validators.required],
    overnightStayDateFrom: [this.inputData.overnightStayDateFrom, Validators.required],
    overnightStayDateTo: [this.inputData.overnightStayDateTo, Validators.required],
    overnightStayStatusId: [this.inputData.overnightStayStatusId, Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<OvernightStaysUpdateComponent, OvernightStayUpdate>,
    @Inject(MAT_DIALOG_DATA) public inputData: OvernightStay,
    private fb: FormBuilder,
    private codebooksService: CodebooksService,
  ) {
  }

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value as unknown as OvernightStayUpdate);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
