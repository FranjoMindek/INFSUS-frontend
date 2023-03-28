import {Injectable} from "@angular/core";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      context?: HttpContext;
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }) {

    return this.http.get<T>(`${environment.BACKEND_API_URL}${url}`, options);
  }

  post<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      context?: HttpContext;
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }) {

    return this.http.post<T>(`${environment.BACKEND_API_URL}${url}`, options);
  }

  put<T>(
    url: string,
    body: any | null,
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe: 'response';
      context?: HttpContext;
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }) {

    return this.http.put<T>(`${environment.BACKEND_API_URL}${url}`, options);
  }

  delete<T>(
    url: string,
    options?: {
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      context?: HttpContext;
      observe?: 'body';
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
      body?: any | null;
    }) {

    return this.http.delete<T>(`${environment.BACKEND_API_URL}${url}`, options);
  }

}
