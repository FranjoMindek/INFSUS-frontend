import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RoomQualityCategory } from '../../../../../data/types/Codebooks';
import { CodebooksService } from '../../../../../data/services/codebooks.service';
import { MatDialog } from '@angular/material/dialog';
import {
  RoomBedCategoriesInsertComponent,
} from '../../../room-bed-categories/componnets/forms/room-bed-categories-insert/room-bed-categories-insert.component';
import { filter, switchMap } from 'rxjs';
import { isNotUndefined } from '../../../../../core/utilities/isNotUndefined';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { RoomQualityCategoriesService } from '../../../../../data/services/room-quality-categories.service';

@Component({
  selector: 'app-room-quality-categories-categories',
  templateUrl: './room-quality-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomQualityCategoriesComponent {
  displayedColumns = [
    'id', 'name', 'actions',
  ];
  codebooks$ = this.codebookService.getCodebooks('roomQualityCategories');
  dataSource: MatTableDataSource<RoomQualityCategory> = new MatTableDataSource<RoomQualityCategory>([]);

  constructor(
    private roomQualityCategoriesService: RoomQualityCategoriesService,
    private codebookService: CodebooksService,
    private dialog: MatDialog,
  ) {
    this.codebooks$.subscribe(codebooks =>
      this.dataSource.data = codebooks.roomQualityCategories,
    );
  }

  onInsertEntity() {
    this.dialog.open<RoomBedCategoriesInsertComponent, null, RoomQualityCategory | undefined>(
      RoomBedCategoriesInsertComponent,
      {
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(isNotUndefined),
          switchMap(result => this.roomQualityCategoriesService.insertRoomQualityCategory(result)),
          switchMap(() => this.codebookService.refreshCodebooks('roomQualityCategories')),
        )
        .subscribe(codebooks => this.dataSource.data = codebooks.roomQualityCategories);
  }

  onDeleteEntity(roomQualityCategory: RoomQualityCategory) {
    this.dialog.open<ConfirmDialogComponent, {title: string}, any>(
      ConfirmDialogComponent,
      {
        data: {title: `Zelite li obrisati kategoriju kvalitete sobe s ID-om ${roomQualityCategory.id}?`},
        maxWidth: '400px',
      },
    )
        .afterClosed()
        .pipe(
          filter(result => result),
          switchMap(() => this.roomQualityCategoriesService.deleteRoomQualityCategory(roomQualityCategory.id)),
          switchMap(() => this.codebookService.refreshCodebooks('roomQualityCategories')),
        )
        .subscribe(codebooks => this.dataSource.data = codebooks.roomQualityCategories);
  }
}

