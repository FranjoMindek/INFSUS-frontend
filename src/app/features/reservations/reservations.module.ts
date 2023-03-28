import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './components/reservations/reservations.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ReservationsRoutingModule} from "./reservations-routing.module";



@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    SharedModule,
    ReservationsRoutingModule
  ],
})
export class ReservationsModule { }