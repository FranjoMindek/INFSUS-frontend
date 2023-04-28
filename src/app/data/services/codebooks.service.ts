import { Injectable } from '@angular/core';
import { combineLatestWith, from, map, Observable, startWith, tap } from 'rxjs';
import { CodebookData, CodebookNames, Codebooks } from '../types/Codebooks';
import { ApiService } from '../../core/services/ApiService';

@Injectable({
  providedIn: 'root',
})
export class CodebooksService {
  private cachedCodebooks: Codebooks = <Codebooks>{};

  constructor(
    private api: ApiService,
  ) { }

  public getCodebooks<CN extends CodebookNames>(
    codebookName: CN, ...codebookNames: CN[]): Observable<Record<CN, CodebookData[]>>
  public getCodebooks<CN extends CodebookNames>(...codebookNames: CN[]): Observable<Record<CN, CodebookData[]>> {

    const codebookNamesHere = codebookNames
      .filter(codebookName => this.cachedCodebooks[codebookName]);
    const codebookNamesToFetch = codebookNames
      .filter(codebookName => !this.cachedCodebooks[codebookName]);

    const codebooksHere$ =
            codebookNamesHere.length > 0
            ? from([this.cachedCodebooks])
              .pipe(
                map(codebooks =>
                  Object.keys(codebooks)
                        .filter(key => (codebookNamesHere as string[]).includes(key))
                        .reduce((obj, key) => {
                          return {
                            ...obj,
                            [key]: codebooks[key as CodebookNames],
                          };
                        }, {}) as Codebooks,
                ),
              )
            : null;


    const codebooksFetching$ =
            codebookNamesToFetch.length > 0
            ? this.api.get<Codebooks>(`/codebooks/${codebookNamesToFetch}`)
                  .pipe(
                    tap(codebooks => {
                      this.cachedCodebooks = Object.assign(this.cachedCodebooks,
                        codebooks);
                    }),
                  )
            : null;


    if (codebookNamesHere.length > 0 && codebookNamesToFetch.length > 0) {
      return codebooksHere$!.pipe(
        combineLatestWith(codebooksFetching$!.pipe(
          startWith({}))),
        map(test => Object.assign(
          test[0], test[1])),
      ) as Observable<Record<CN, CodebookData[]>>;
    } else if (codebookNamesHere.length > 0) {
      return codebooksHere$! as Observable<Record<CN, CodebookData[]>>;
    } else {
      return codebooksFetching$! as Observable<Record<CN, CodebookData[]>>;
    }
  }

  public refreshCodebooks<CN extends CodebookNames>(
    codebookName: CN, ...codebookNames: CN[]): Observable<Record<CN, CodebookData[]>>
  public refreshCodebooks<CN extends CodebookNames>(...codebookNames: CN[]): Observable<Record<CN, CodebookData[]>> {
    codebookNames.forEach(name => delete this.cachedCodebooks[name]);
    return this.getCodebooks(codebookNames as unknown as CodebookNames);
  }

}
