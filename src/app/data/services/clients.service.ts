import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/ApiService';
import { Client } from '../types/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  constructor(private api: ApiService) {
  }

  getClients() {
    return this.api.get<Client[]>(`/clients`);
  }

  getClientById(clientId: number | string) {
    return this.api.get<Client>(`/clients/${clientId}`);
  }

  insertClient(client: Client) {
    return this.api.post(`/clients`, client);
  }

  updateClient(client: Client) {
    return this.api.put(`/clients/${client.clientId}`, client);
  }

  deleteClient(clientId: number | string) {
    return this.api.delete(`/clients/${clientId}`);
  }

}
