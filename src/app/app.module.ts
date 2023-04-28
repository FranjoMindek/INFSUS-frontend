import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { RoomsModule } from './features/rooms/rooms.module';
import { ReservationsModule } from './features/reservations/reservations.module';
import { OvernightStaysModule } from './features/overnight-stays/overnight-stays.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientsModule } from './features/clients/clients.module';
import { RoomCategoryModule } from './features/configuration/room-category/room-category.module';
import { RoomQualityModule } from './features/configuration/room-quality/room-quality.module';
import { RoomBedCategoriesModule } from './features/configuration/room-bed-categories/room-bed-categories.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // custom made
    CoreModule,
    RoomsModule,
    ReservationsModule,
    OvernightStaysModule,
    ClientsModule,
    RoomCategoryModule,
    RoomQualityModule,
    RoomBedCategoriesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
