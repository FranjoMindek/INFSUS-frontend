import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomQualityCategoriesRoutingModule } from './room-quality-categories-routing.module';
import {
  RoomQualityCategoriesInsertComponent,
} from './componnets/forms/room-quality-insert/room-quality-categories-insert.component';
import { RoomQualityCategoriesComponent } from './componnets/room-quality-categories/room-quality-categories.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    RoomQualityCategoriesInsertComponent,
    RoomQualityCategoriesComponent,
  ],
  imports: [
    CommonModule,
    RoomQualityCategoriesRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class RoomQualityCategoriesModule {}
