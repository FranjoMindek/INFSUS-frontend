import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomQualityRoutingModule } from './room-quality-routing.module';
import { RoomQualityUpdateComponent } from './componnets/forms/room-quality-update/room-quality-update.component';
import { RoomQualityInsertComponent } from './componnets/forms/room-quality-insert/room-quality-insert.component';
import { RoomQualityComponent } from './componnets/room-quality/room-quality.component';


@NgModule({
  declarations: [
    RoomQualityUpdateComponent,
    RoomQualityInsertComponent,
    RoomQualityComponent
  ],
  imports: [
    CommonModule,
    RoomQualityRoutingModule
  ]
})
export class RoomQualityModule { }
