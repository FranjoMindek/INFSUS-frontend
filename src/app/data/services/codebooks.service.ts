import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Codebook, Codebooks } from '../types/Codebook';
import { ApiService } from '../../core/services/ApiService';

@Injectable({
  providedIn: 'root',
})
export class CodebooksService {

  private codebooks$: {[index: string]: ReplaySubject<Codebook[]>} = {};

  constructor(
    private api: ApiService,
  ) {
  }

  public getCodebooks(...codebookNames: string[]): [{[p: string]: Observable<Codebook[]>}, Observable<Codebooks> | null] {

    const codebookNamesHere = codebookNames.filter(codebookName => this.codebooks$[codebookName]);
    const codebookNamesToFetch = codebookNames.filter(codebookName => !this.codebooks$[codebookName]);

    const codebooksHere: {[index: string]: Observable<Codebook[]>} = {};
    codebookNamesHere.forEach(name => codebooksHere[name] = this.codebooks$[name].asObservable());

    if (codebookNamesToFetch.length > 0) {
      const fetching = this.api.get<Codebooks>(`/codebooks/${codebookNamesToFetch}`)
                           .pipe(
                             tap(codebooks => {
                               Object.keys(codebooks)
                                     .forEach(name => {
                                       const subject = new ReplaySubject<Codebook[]>(1);
                                       subject.next(codebooks[name]);
                                       this.codebooks$[name] = subject;
                                     });
                             }),
                           );

      return [codebooksHere, fetching];
    }

    return [codebooksHere, null];
  }
}
