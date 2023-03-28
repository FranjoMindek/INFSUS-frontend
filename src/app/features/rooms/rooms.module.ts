import { NgModule } from '@angular/core';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { ClientsRoutingModule } from '../clients/clients-routing.module';


@NgModule({
    declarations: [
        RoomsComponent,
    ],
    imports: [
        SharedModule,
        ClientsRoutingModule,
        MatTableModule,
    ],
})
export class RoomsModule {
}
