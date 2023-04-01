import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../../../data/services/clients.service';
import { Client } from '../../../../data/types/Client';
import { FormActions, FormDialogData, FormType } from '../../../../data/types/FormDialogData';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';

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

  newEntityForm: FormDialogData = {
    title: 'Unesi novu rezervaciju',
    formInfo: [
      {
        name: 'clientId',
        type: FormType.NUMBER,
        validators: [Validators.required],
      },
      {
        name: 'clientFirstName',
        type: FormType.STRING,
        validators: [Validators.required],
      },
      {
        name: 'clientLastName',
        type: FormType.STRING,
        validators: [Validators.required],
      },
    ],
  };

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
    const dialogRef = this.dialog.open<FormDialogComponent, FormDialogData, any>(
      FormDialogComponent,
      {
        data: this.newEntityForm,
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

}
