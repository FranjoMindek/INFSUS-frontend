import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomCategoriesComponent } from './componnets/room-categories/room-categories.component';

const routes: Routes = [
  {
    path: 'room-categories',
    component: RoomCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomCategoriesRoutingModule {}
