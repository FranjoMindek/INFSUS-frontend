import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomCategoryRoutingModule } from './room-category-routing.module';
import { RoomCategoryComponent } from './componnets/room-category/room-category.component';
import { RoomCategoryInsertComponent } from './componnets/forms/room-category-insert/room-category-insert.component';
import { RoomCategoryUpdateComponent } from './componnets/forms/room-category-update/room-category-update.component';


@NgModule({
  declarations: [
    RoomCategoryComponent,
    RoomCategoryInsertComponent,
    RoomCategoryUpdateComponent
  ],
  imports: [
    CommonModule,
    RoomCategoryRoutingModule
  ]
})
export class RoomCategoryModule { }
