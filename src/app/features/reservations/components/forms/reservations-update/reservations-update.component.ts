import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation, ReservationUpdate } from '../../../../../data/types/Reservation';

@Component({
  selector: 'app-reservations-update-form',
  templateUrl: './reservations-update.component.html',
})
export class ReservationsUpdateComponent {

  codebooks$ = this.codebooksService.getCodebooks('reservationStatuses', 'rooms');

  form = this.fb.group({
    roomId: [String(this.inputData.roomId), Validators.required],
    reservationDateFrom: [this.inputData.reservationDateFrom, Validators.required],
    reservationDateTo: [this.inputData.reservationDateTo, Validators.required],
    reservationStatusId: [this.inputData.reservationStatusId, Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ReservationsUpdateComponent, ReservationUpdate>,
    @Inject(MAT_DIALOG_DATA) public inputData: Reservation,
    private fb: FormBuilder,
    private codebooksService: CodebooksService,
  ) {
  }

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value as unknown as ReservationUpdate);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
