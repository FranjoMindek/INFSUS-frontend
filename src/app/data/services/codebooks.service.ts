import { Injectable } from '@angular/core';
import { combineLatestWith, from, map, Observable, startWith, tap } from 'rxjs';
import { CodebookNames, Codebooks } from '../types/Codebooks';
import { ApiService } from '../../core/services/ApiService';

@Injectable({
  providedIn: 'root',
})
export class CodebooksService {
  private cachedCodebooks: Codebooks = {};

  constructor(
    private api: ApiService,
  ) { }

  public getCodebooks(codebookName: CodebookNames, ...codebookNames: CodebookNames[]): Observable<Codebooks>
  public getCodebooks(...codebookNames: CodebookNames[]): Observable<Codebooks> {

    const codebookNamesHere = codebookNames.filter(codebookName => this.cachedCodebooks[codebookName]) as string[];
    const codebookNamesToFetch = codebookNames.filter(codebookName => !this.cachedCodebooks[codebookName]) as string[];

    let codebooksHere$: Observable<Codebooks>;
    if (codebookNamesHere.length > 0) {
      codebooksHere$ = from([this.cachedCodebooks])
        .pipe(
          map(codebooks =>
            Object.keys(codebooks)
                  .filter(key => codebookNamesHere.includes(key))
                  .reduce((obj, key) => {
                    return {
                      ...obj,
                      [key]: codebooks[key],
                    };
                  }, {}) as Codebooks,
          ),
        );
    }

    let codebooksFetching$: Observable<Codebooks>;
    if (codebookNamesToFetch.length > 0) {
      codebooksFetching$ = this.api.get<Codebooks>(`/codebooks/${codebookNamesToFetch}`)
                               .pipe(
                                 tap(codebooks => {
                                   this.cachedCodebooks = Object.assign(this.cachedCodebooks, codebooks);
                                 }),
                                 startWith({}),
                               );
    }


    if (codebookNamesHere.length > 0 && codebookNamesToFetch.length > 0) {
      return codebooksHere$!.pipe(
        combineLatestWith(codebooksFetching$!),
        map((test: [Codebooks, Codebooks]) => Object.assign(test[0], test[1])),
      );
    } else if (codebookNamesHere.length > 0) {
      return codebooksHere$!;
    } else {
      return codebooksFetching$!;
    }
  }
}
