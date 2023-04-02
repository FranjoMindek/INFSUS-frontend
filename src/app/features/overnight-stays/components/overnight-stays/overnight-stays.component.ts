import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OvernightStaysService } from '../../../../data/services/overnight-stays.service';
import { OvernightStay, OvernightStayDTO } from '../../../../data/types/OvernightStay';
import { DataType, FormActions, FormDialogData } from '../../../../data/types/FormDialogData';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { FormDialogComponent } from '../../../../shared/components/form-dialog/form-dialog.component';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../core/utilities/isNotUndefined';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-overnight-stays',
  templateUrl: './overnight-stays.component.html',
  styleUrls: ['./overnight-stays.component.css'],
})
export class OvernightStaysComponent {

  tableInfo = {
    overnightStayId: {
      type: DataType.NUMBER,
      name: 'ID nocenja',
    },
    clientId: {
      type: DataType.NUMBER,
      name: 'OIB klijenta',
    },
    roomId: {
      type: DataType.NUMBER,
      name: 'ID sobe',
    },
    overnightStayDateFrom: {
      type: DataType.DATE,
      name: 'Datum pocetka nocenja',
    },
    overnightStayDateTo: {
      type: DataType.DATE,
      name: 'Datum kraja nocenja',
    },
    overnightStayStatusId: {
      type: DataType.STRING,
      name: 'Status nocenja',
    },
    actions: {
      type: DataType.ACTIONS,
      name: 'Akcije',
      values: [
        FormActions.INSERT,
        FormActions.UPDATE,
        FormActions.DELETE,
      ],
    },
  };
  tableKeys = Object.keys(this.tableInfo);
  dataType = DataType;
  formActions = FormActions;

  overnightStays$ = this.overnightStaysService.getOvernightStays();
  dataSource = new MatTableDataSource<OvernightStay>([]);

  constructor(
    private overnightStaysService: OvernightStaysService,
    public dialog: MatDialog) {
    this.overnightStays$.subscribe(overnightStays => {
      this.dataSource.data = overnightStays;
    });
  }

  onInsertEntity(): void {
    const newEntityForm: FormDialogData = {
      title: 'Unesi novo nocenje',
      formInfo: [
        {
          name: 'clientId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'roomId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'overnightStayDateRange',
          type: DataType.DATE_RANGE,
          validators: [Validators.required],
          from: 'overnightStayDateFrom',
          to: 'overnightStayDateTo',
        },
      ],
    };

    this.dialog.open<FormDialogComponent, FormDialogData, OvernightStayDTO | undefined>(
      FormDialogComponent,
      {
        data: newEntityForm,
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.overnightStaysService.insertOvernightStays(result)),
          switchMap(() => this.overnightStaysService.getOvernightStays()),
        )
        .subscribe(overnightStays => this.dataSource.data = overnightStays);
  }

  onUpdateEntity(overnightStay: OvernightStay): void {
    const updateEntityForm: FormDialogData = {
      title: `Uredi nocenje s ID-jem ${overnightStay.overnightStayId}`,
      formInfo: [
        {
          value: overnightStay.roomId,
          name: 'roomId',
          type: DataType.NUMBER,
          validators: [Validators.required],
        },
        {
          name: 'overnightStayDateRange',
          type: DataType.DATE_RANGE,
          validators: [Validators.required],
          from: 'overnightStayDateFrom',
          to: 'overnightStayDateTo',
          valueFrom: overnightStay.overnightStayDateFrom,
          valueTo: overnightStay.overnightStayDateTo,
        },
      ],
    };

    this.dialog.open<FormDialogComponent, FormDialogData, OvernightStayDTO | undefined>(
      FormDialogComponent,
      {
        data: updateEntityForm,
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.overnightStaysService.updateOvernightStay({...overnightStay, ...result})),
          switchMap(() => this.overnightStaysService.getOvernightStays()),
        )
        .subscribe(overnightStays => this.dataSource.data = overnightStays);
  }

  onDeleteEntity(overnightStay: OvernightStay): void {
    this.dialog.open<ConfirmDialogComponent, {title: string}, any>(
      ConfirmDialogComponent,
      {
        data: {title: `Zelite li obrisati rezervaciju s ID-om ${overnightStay.overnightStayId}?`},
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.overnightStaysService.deleteOvernightStay(overnightStay.overnightStayId)),
          switchMap(() => this.overnightStaysService.getOvernightStays()),
        )
        .subscribe(overnightStays => this.dataSource.data = overnightStays);
  }
}
