import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../../../data/services/clients.service';
import { Client } from '../../../../data/types/Client';
import { DataType, FormActions, FormDialogData } from '../../../../data/types/FormDialogData';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent
  implements OnInit {

  displayedColumns = [
    'clientId', 'clientFirstName', 'clientLastName',
  ];
  displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
  actions = [
    FormActions.INSERT,
    FormActions.UPDATE,
    FormActions.DELETE,
  ];
  formActions = FormActions;

  clients$ = this.clientsService.getClients();
  dataSource = new MatTableDataSource<Client>([]);

  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.clients$.subscribe(clients => {
      this.dataSource.data = clients;
    });
  }

  onInsertEntity(): void {
    const newEntityForm: FormDialogData = {
      title: 'Unesi novog klijenta',
      formInfo: [
        {
          name: 'clientId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'clientFirstName',
          type: DataType.STRING,
          validators: [Validators.required],
        },
        {
          name: 'clientLastName',
          type: DataType.STRING,
          validators: [Validators.required],
        },
      ],
    };

    const dialogRef = this.dialog.open<FormDialogComponent, FormDialogData, any>(
      FormDialogComponent,
      {
        data: newEntityForm,
        maxWidth: '400px',
      },
    );

    dialogRef.afterClosed()
             .subscribe((result: Client | undefined) => {
               if (result === undefined) return;
               this.clientsService
                   .insertClient(result)
                   .subscribe(valid => {
                     if (valid) {
                       this.clientsService.getClients()
                           .subscribe(clients => {
                             this.dataSource.data = clients;
                           });
                     }
                   });
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

    const dialogRef = this.dialog.open<FormDialogComponent, FormDialogData, any>(
      FormDialogComponent,
      {
        data: updateEntityForm,
        maxWidth: '400px',
      },
    );

    dialogRef.afterClosed()
             .subscribe((result: Client | undefined) => {
               if (result === undefined) return;
               this.clientsService
                   .updateClient({...client, ...result})
                   .subscribe(valid => {
                     if (valid) {
                       this.clientsService.getClients()
                           .subscribe(clients => {
                             this.dataSource.data = clients;
                           });
                     }
                   });
             });
  }

  onDeleteEntity(client: Client): void {

    const dialogRef = this.dialog.open<ConfirmDialogComponent, {title: string}, any>(
      ConfirmDialogComponent,
      {
        data: {title: `Zelite li obrisati klijenta s OIB-om ${client.clientId}?`},
        maxWidth: '400px',
      },
    );

    dialogRef.afterClosed()
             .subscribe((result: boolean | undefined) => {
               if (!result) return;
               this.clientsService
                   .deleteClient(client.clientId)
                   .subscribe(valid => {
                     if (valid) {
                       this.clientsService.getClients()
                           .subscribe(clients => {
                             this.dataSource.data = clients;
                           });
                     }
                   });
             });

  }
}
