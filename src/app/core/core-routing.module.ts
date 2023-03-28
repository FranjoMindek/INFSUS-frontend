import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RoomsComponent} from "../features/rooms/components/rooms/rooms.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full'
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
