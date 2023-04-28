import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomBedCategoriesComponent } from './componnets/room-bed-categories/room-bed-categories.component';

const routes: Routes = [
  {
    path: 'room-bed-categories',
    component: RoomBedCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomBedCategoriesRoutingModule {}
