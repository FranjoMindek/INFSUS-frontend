import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../core/utilities/isNotUndefined';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CodebooksService } from '../../../../data/services/codebooks.service';
import { OvernightStay, OvernightStayInsert, OvernightStayUpdate } from '../../../../data/types/OvernightStay';

import { OvernightStaysService } from '../../../../data/services/overnight-stays.service';
import { OvernightStaysInsertComponent } from '../forms/overnight-stays-insert/overnight-stays-insert.component';
import { OvernightStaysUpdateComponent } from '../forms/overnight-stays-update/overnight-stays-update.component';
import { CodebookData } from '../../../../data/types/Codebooks';

@Component({
  selector: 'app-overnight-stays',
  templateUrl: './overnight-stays.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvernightStaysComponent {
  displayedColumns = [
    'overnightStayId', 'clientId', 'roomId', 'overnightStayDateFrom', 'overnightStayDateTo', 'overnightStayStatusId',
    'actions',
  ];

  overnightStays$ = this.overnightStaysService.getOvernightStays();
  codebooks$ = this.codebookService.getCodebooks('rooms', 'overnightStayStatuses');
  dataSource: MatTableDataSource<OvernightStay> = new MatTableDataSource<OvernightStay>([]);
  statuses: CodebookData[] | undefined = undefined;

  constructor(
    private overnightStaysService: OvernightStaysService,
    private dialog: MatDialog,
    private codebookService: CodebooksService,
  ) {
    this.overnightStays$.subscribe(overnightStays =>
      this.dataSource.data = overnightStays,
    );
    this.codebooks$.subscribe(value => {
      this.statuses = value.overnightStayStatuses;
    });
    this.dataSource.filterPredicate = (record, filter) => {
      let dataStr = '';
      dataStr += record.overnightStayId;
      dataStr += '◬';
      dataStr += record.clientId;
      dataStr += '◬';
      dataStr += record.roomId;
      dataStr += '◬';
      dataStr += new Date(record.overnightStayDateFrom!).toLocaleDateString();
      dataStr += '◬';
      dataStr += new Date(record.overnightStayDateTo!).toLocaleDateString();
      dataStr += '◬';
      if (this.statuses) {
        dataStr += this.statuses.filter(value => value.id === record.overnightStayStatusId)[0].name;
      }
      dataStr = dataStr.toLowerCase();

      const transformedFilter = filter.trim()
                                      .toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim()
                                        .toLowerCase();
  }

  onInsertEntity(): void {
    this.dialog.open<OvernightStaysInsertComponent, null, OvernightStayInsert | undefined>(
      OvernightStaysInsertComponent,
      {
        maxWidth: '400px',
      })
        .afterClosed()
        .pipe(
          filter(entity => !!entity),
          switchMap(entity => this.overnightStaysService.insertOvernightStays(entity!)),
          switchMap(() => this.overnightStaysService.getOvernightStays()),
        )
        .subscribe(overnightStays => this.dataSource.data = overnightStays);
  }

  onUpdateEntity(overnightStay: OvernightStay): void {
    this.dialog.open<OvernightStaysUpdateComponent, OvernightStay, OvernightStayUpdate | undefined>(
      OvernightStaysUpdateComponent,
      {
        data: overnightStay,
        maxWidth: '400px',
      })
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
        data: {title: `Zelite li obrisati nocenje s ID-om ${overnightStay.overnightStayId}?`},
        maxWidth: '400px',
      })
        .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.overnightStaysService.deleteOvernightStay(overnightStay.overnightStayId)),
          switchMap(() => this.overnightStaysService.getOvernightStays()),
        )
        .subscribe(overnightStays => this.dataSource.data = overnightStays);
  }
}
