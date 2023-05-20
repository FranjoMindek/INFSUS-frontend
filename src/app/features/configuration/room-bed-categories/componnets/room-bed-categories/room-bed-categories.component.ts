import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoomBedCategoriesService } from '../../../../../data/services/room-bed-categories.service';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RoomBedCategory } from '../../../../../data/types/Codebooks';
import { filter, switchMap } from 'rxjs';
import {
  RoomBedCategoriesInsertComponent,
} from '../forms/room-bed-categories-insert/room-bed-categories-insert.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { isNotUndefined } from '../../../../../core/utilities/isNotUndefined';

@Component({
  selector: 'app-room-bed-categories',
  templateUrl: './room-bed-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomBedCategoriesComponent {
  displayedColumns = [
    'id', 'name', 'actions',
  ];
  codebooks$ = this.codebookService.getCodebooks('roomBedCategories');
  dataSource: MatTableDataSource<RoomBedCategory> = new MatTableDataSource<RoomBedCategory>([]);

  constructor(
    private roomBedCategoriesService: RoomBedCategoriesService,
    private codebookService: CodebooksService,
    private dialog: MatDialog,
  ) {
    this.codebooks$.subscribe(codebooks =>
      this.dataSource.data = codebooks.roomBedCategories,
    );
  }

  onInsertEntity() {
    this.dialog.open<RoomBedCategoriesInsertComponent, null, RoomBedCategory | undefined>(
      RoomBedCategoriesInsertComponent,
      {
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.roomBedCategoriesService.insertRoomBedCategory(result)),
          switchMap(() => this.codebookService.refreshCodebooks('roomBedCategories')),
        )
        .subscribe(roomBedCategories => this.dataSource.data = roomBedCategories.roomBedCategories);
  }

  onDeleteEntity(roomBedCategory: RoomBedCategory) {
    this.dialog.open<ConfirmDialogComponent, {title: string}, any>(
      ConfirmDialogComponent,
      {
        data: {title: `Zelite li obrisati kategoriju kreveta s ID-om ${roomBedCategory.id}?`},
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.roomBedCategoriesService.deleteRoomBedCategory(roomBedCategory.id)),
          switchMap(() => this.codebookService.refreshCodebooks('roomBedCategories')),
        )
        .subscribe(roomBedCategories => this.dataSource.data = roomBedCategories.roomBedCategories);
  }
}
