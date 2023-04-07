import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ClientsService } from '../../../../../data/services/clients.service';
import { Client } from '../../../../../data/types/Client';

@Component({
  selector: 'app-reservations-insert-form',
  templateUrl: './reservations-insert.component.html',
})
export class ReservationsInsertComponent {

  codebooks$ = this.codebooksService.getCodebooks('rooms');

  form = this.fb.group({
    clientNationalId: ['', Validators.required],
    clientFirstName: [''],
    clientLastName: [''],
    clientPhoneNumber: ['', Validators.required],
    roomId: ['', Validators.required],
    reservationDateFrom: ['', Validators.required],
    reservationDateTo: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ReservationsInsertComponent>,
    private fb: FormBuilder,
    private codebooksService: CodebooksService,
    private clientsService: ClientsService,
  ) {
    this.form.controls.clientNationalId.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(clientNationalId => !!clientNationalId),
      switchMap(clientNationalId => this.clientsService.getClientByNationalId(clientNationalId!)),
      filter(client => !!client),
    )
        .subscribe((client: Client) => this.form.patchValue({
            clientFirstName: client.clientFirstName,
            clientLastName: client.clientLastName,
            clientPhoneNumber: client.clientPhoneNumber,
          }),
        );
  }

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
