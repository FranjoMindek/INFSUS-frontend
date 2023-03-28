import {Component, OnInit, ViewChild} from '@angular/core';
import {RoomsService} from "../../../../data/services/rooms.service";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {RoomsDetailed} from "../../../../data/types/RoomsDetailed";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['roomCode', 'roomFloor', 'statusName', 'roomCategoryPrice', 'roomBedCategoryName', 'roomQualityCategoryName'];
  rooms$ = this.roomsService.getRoomsDetailed();
  dataSource = new MatTableDataSource<RoomsDetailed>();

  constructor(private roomsService: RoomsService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.rooms$.subscribe(rooms => {
        this.dataSource.data = rooms
    })
  }
}
