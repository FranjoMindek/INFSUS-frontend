import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../../../data/services/clients.service';
import { Client } from '../../../../data/types/Client';
import { DataType, FormActions, FormDialogData } from '../../../../data/types/FormDialogData';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../core/utilities/isNotUndefined';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {

  tableInfo = {
    clientId: {
      type: DataType.NUMBER,
      name: 'OIB klijenta',
    },
    clientFirstName: {
      type: DataType.STRING,
      name: 'Ime klijenta',
    },
    clientLastName: {
      type: DataType.STRING,
      name: 'Prezime klijenta',
    },
    actions: {
      type: DataType.ACTIONS,
      name: 'Akcije',
      values: [
        FormActions.UPDATE,
      ],
    },
  };
  tableKeys = Object.keys(this.tableInfo);
  dataType = DataType;
  formActions = FormActions;

  reservations$ = this.clientService.getClients();
  dataSource = new MatTableDataSource<Client>([]);

  constructor(
    private clientService: ClientsService,
    public dialog: MatDialog) {
    this.reservations$.subscribe(clients => {
      this.dataSource.data = clients;
    });
  }

  onUpdateEntity(client: Client): void {
    const updateEntityForm: FormDialogData = {
      title: `Uredi klijenta s OIB-om ${client.clientId}`,
      formInfo: [
        {
          value: client.clientFirstName,
          name: 'clientFirstName',
          type: DataType.STRING,
          validators: [Validators.required],
        },
        {
          value: client.clientLastName,
          name: 'clientLastName',
          type: DataType.STRING,
          validators: [Validators.required],
        },
      ],
    };

    this.dialog.open<FormDialogComponent, FormDialogData, Omit<Client, 'clientId'> | undefined>(
      FormDialogComponent,
      {
        data: updateEntityForm,
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.clientService.updateClient({...client, ...result})),
          switchMap(() => this.clientService.getClients()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }
}
