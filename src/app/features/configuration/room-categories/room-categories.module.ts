import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomCategoriesRoutingModule } from './room-categories-routing.module';
import { RoomCategoriesComponent } from './componnets/room-categories/room-categories.component';
import {
  RoomCategoriesInsertComponent,
} from './componnets/forms/room-category-insert/room-categories-insert.component';
import {
  RoomCategoriesUpdateComponent,
} from './componnets/forms/room-category-update/room-categories-update.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CodebookPipe } from '../../../shared/pipes/codebook.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    RoomCategoriesComponent,
    RoomCategoriesInsertComponent,
    RoomCategoriesUpdateComponent,
  ],
  imports: [
    CommonModule,
    RoomCategoriesRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CodebookPipe,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class RoomCategoriesModule {}
