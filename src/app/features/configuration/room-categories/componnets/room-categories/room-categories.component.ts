import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../../core/utilities/isNotUndefined';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { RoomCategoriesService } from '../../../../../data/services/room-categories.service';
import { RoomCategory } from '../../../../../data/types/RoomCategory';
import { RoomCategoriesInsertComponent } from '../forms/room-category-insert/room-categories-insert.component';
import { RoomCategoriesUpdateComponent } from '../forms/room-category-update/room-categories-update.component';

@Component({
  selector: 'app-room-categories',
  templateUrl: './room-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCategoriesComponent {
  displayedColumns = [
    'roomCategoryId', 'roomCategoryName', 'roomCategoryPrice', 'roomBedCategoryId', 'roomQualityCategoryId', 'actions',
  ];
  roomCategories$ = this.roomCategoriesService.getRoomCategories();
  codebooks$ = this.codebookService.getCodebooks('roomQualityCategories', 'roomBedCategories');
  dataSource: MatTableDataSource<RoomCategory> = new MatTableDataSource<RoomCategory>([]);

  constructor(
    private roomCategoriesService: RoomCategoriesService,
    private codebookService: CodebooksService,
    private dialog: MatDialog,
  ) {
    this.roomCategories$.subscribe(roomCategories =>
      this.dataSource.data = roomCategories,
    );
  }

  onInsertEntity() {
    this.dialog.open<RoomCategoriesInsertComponent, null, RoomCategory | undefined>(
      RoomCategoriesInsertComponent,
      {
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.roomCategoriesService.mergeRoomCategory(result)),
          switchMap(() => this.roomCategoriesService.getRoomCategories()),
        )
        .subscribe(roomCategories => this.dataSource.data = roomCategories);
  }

  onUpdateEntity(roomCategory: RoomCategory): void {
    this.dialog.open<RoomCategoriesUpdateComponent, RoomCategory, RoomCategory | undefined>(
      RoomCategoriesUpdateComponent,
      {
        data: roomCategory,
        maxWidth: '400px',
      })
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.roomCategoriesService.mergeRoomCategory({...roomCategory, ...result})),
          switchMap(() => this.roomCategoriesService.getRoomCategories()),
        )
        .subscribe(reservations => this.dataSource.data = reservations);
  }


  onDeleteEntity(roomCategory: RoomCategory) {
    this.dialog.open<ConfirmDialogComponent, {title: string}, any>(
      ConfirmDialogComponent,
      {
        data: {title: `Zelite li obrisati kategoriju sobe s ID-om ${roomCategory.roomCategoryId}?`},
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.roomCategoriesService.deleteRoomCategory(roomCategory.roomCategoryId)),
          switchMap(() => this.roomCategoriesService.getRoomCategories()),
        )
        .subscribe(roomCategories => this.dataSource.data = roomCategories);
  }
}
