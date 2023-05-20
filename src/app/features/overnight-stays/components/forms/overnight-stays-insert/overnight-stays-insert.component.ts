import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { ClientsService } from '../../../../../data/services/clients.service';
import { debounce, distinctUntilChanged, filter, interval, switchMap } from 'rxjs';
import { Client } from '../../../../../data/types/Client';
import { OvernightStayInsert } from '../../../../../data/types/OvernightStay';

@Component({
  selector: 'app-overnight-stays-insert',
  templateUrl: './overnight-stays-insert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvernightStaysInsertComponent {

  codebooks$ = this.codebooksService.getCodebooks('rooms');

  form = this.fb.group({
    clientInsert: this.fb.group({
      clientNationalId: ['', Validators.required],
      clientFirstName: [''],
      clientLastName: [''],
      clientPhoneNumber: ['', Validators.required],
    }),
    roomId: [undefined, Validators.required],
    overnightStayDateFrom: [new Date(), Validators.required],
    overnightStayDateTo: [undefined, Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<OvernightStaysInsertComponent, OvernightStayInsert>,
    private fb: FormBuilder,
    private codebooksService: CodebooksService,
    private clientsService: ClientsService,
  ) {
    this.form.controls.clientInsert.controls.clientNationalId.valueChanges.pipe(
      debounce(() => interval(500)),
      distinctUntilChanged(),
      filter(clientNationalId => !!clientNationalId),
      switchMap(clientNationalId => this.clientsService.getClientByNationalId(clientNationalId!)),
      filter(client => !!client),
    )
        .subscribe((client: Client) => this.form.patchValue({
          clientInsert: {
            clientFirstName: client.clientFirstName,
            clientLastName: client.clientLastName,
            clientPhoneNumber: client.clientPhoneNumber,
          },
        }));
  }

  onConfirm() {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value as OvernightStayInsert);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
