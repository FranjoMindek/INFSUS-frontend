import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataType, FormActions } from '../../../data/types/FormDialogData';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../../../data/types/Reservation';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
})
export class MyTableComponent
  implements OnInit {
  @Input() title!: string;
  @Input() tableInfo!: any;
  @Output() onInsertEntity = new EventEmitter<any>();
  @Output() onUpdateEntity = new EventEmitter<any>();
  @Output() onDeleteEntity = new EventEmitter<any>();
  dataSource = new MatTableDataSource<Reservation>([]);
  dataType = DataType;
  formActions = FormActions;
  tableKeys: any;

  @Input() set tableData(data: any) {
    this.dataSource.data = data;
  }

  public ngOnInit(): void {
    this.tableKeys = Object.keys(this.tableInfo);
  }
}
