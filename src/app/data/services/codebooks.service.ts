import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Codebooks } from '../types/Codebook';
import { ApiService } from '../../core/services/ApiService';

@Injectable({
  providedIn: 'root',
})
export class CodebooksService {

  private codebooks$: ReplaySubject<Codebooks> = new ReplaySubject<Codebooks>(1);

  constructor(private api: ApiService) {
    console.log('radim');
    this.api.get<Codebooks>(`/codebooks`)
        .subscribe(this.codebooks$);
  }

  public getCodebooks() {
    return this.codebooks$.asObservable();
  }
}
