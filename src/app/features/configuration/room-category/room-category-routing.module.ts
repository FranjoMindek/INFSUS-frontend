import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomCategoryComponent } from './componnets/room-category/room-category.component';

const routes: Routes = [
  {
    path: 'room-category',
    component: RoomCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomCategoryRoutingModule {}
