import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomQualityCategoriesComponent } from './componnets/room-quality-categories/room-quality-categories.component';

const routes: Routes = [
  {
    path: 'room-quality-categories-categories',
    component: RoomQualityCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomQualityCategoriesRoutingModule {}
