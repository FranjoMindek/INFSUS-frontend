import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomBedCategoriesRoutingModule } from './room-bed-categories-routing.module';
import { RoomBedCategoriesComponent } from './componnets/room-bed-categories/room-bed-categories.component';
import {
  RoomBedCategoriesInsertComponent,
} from './componnets/forms/room-bed-categories-insert/room-bed-categories-insert.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CodebookPipe } from '../../../shared/pipes/codebook.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    RoomBedCategoriesComponent,
    RoomBedCategoriesInsertComponent,
  ],
  imports: [
    CommonModule,
    RoomBedCategoriesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CodebookPipe,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class RoomBedCategoriesModule {}
