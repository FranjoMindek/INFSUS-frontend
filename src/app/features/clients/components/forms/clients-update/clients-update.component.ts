import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../../data/types/Client';

@Component({
  selector: 'app-clients-update',
  templateUrl: './clients-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsUpdateComponent {

  form = this.fb.group({
    clientId: [this.inputData.clientId],
    clientPhoneNumber: [
      this.inputData.clientPhoneNumber, [
        Validators.required, Validators.pattern(
          '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})'),
      ],
    ],
    clientFirstName: [this.inputData.clientFirstName, Validators.required],
    clientLastName: [this.inputData.clientLastName, Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ClientsUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: Client,
    private fb: FormBuilder,
  ) {
  }

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
