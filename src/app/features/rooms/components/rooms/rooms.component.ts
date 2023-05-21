import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoomsService } from '../../../../data/services/rooms.service';
import { MatTableDataSource } from '@angular/material/table';
import { RoomsDetailed } from '../../../../data/types/Room';
import { MatDialog } from '@angular/material/dialog';
import { CodebooksService } from '../../../../data/services/codebooks.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {

  displayedColumns = [
    'roomId', 'roomCode', 'roomFloor', 'roomStatusId', 'roomCategoryName', 'roomCategoryPrice',
    'roomBedCategoryId', 'roomQualityCategoryId',
  ];

  rooms$ = this.roomService.getDetailedRooms();
  codebooks$ = this.codebookService.getCodebooks('roomStatuses', 'roomBedCategories', 'roomQualityCategories');
  dataSource = new MatTableDataSource<RoomsDetailed>([]);

  constructor(
    private roomService: RoomsService,
    private codebookService: CodebooksService,
    public dialog: MatDialog,
  ) {
    this.rooms$.subscribe(rooms => {
      this.dataSource.data = rooms;
    });
  }
}
