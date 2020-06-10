import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { EndPoint } from "./end-point";
import { AlertService } from "../shared/services/alert.service";

@Injectable({ providedIn: 'root' })
export class ApiHandler {
    _BASE_URL: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private alert: AlertService) {
        console.log(baseUrl);
        this._BASE_URL = `${baseUrl}_api`;
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
       
        try {
            let messages = [];
            for (let e in err.error) {
                messages.push(err.error[e][0]);
            }
            this.alert.error(messages);
        } catch (e) {
            alert(JSON.stringify(err.error));
        } finally {
            console.error(errorMessage);
            return throwError(err.error);
        }
    }

    public get<T>(url: EndPoint, params = null, queryParams: {} = null): Observable<T> {
        let _url = `${this._BASE_URL}/${url}`;
        if (params != undefined) {
            if (Array.isArray(params))
                params.forEach(p => _url += `/${p}`);
            else
                _url += `/${params}`;
        }

        if (queryParams) {
            for (const [index, [key, value]] of Object.entries(Object.entries(queryParams)))
                _url += `${Number(index) == 0 ? '?' : '&'}${key}=${value != undefined && value != null ? value : ''}`;
        }

        return this.http.get<T>(_url, httpOptions)
            .pipe(
                tap(data => data),
                catchError(this.handleError.bind(this))
            );
    }

    public create<TObject, TResult>(url: EndPoint, object: TObject): Observable<TResult> {
        const _url = `${this._BASE_URL}/${url}`;

        return this.http.post<TResult>(_url, JSON.stringify(object), httpOptions)
            .pipe(
                map(data => data),
                catchError(this.handleError.bind(this))
            );
    }
}

const httpOptions = <HttpOptions>{
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": ""
    }),
    body: {},
    responseType: "json",
    observe: "body",
    withCredentials: false,
    reportProgress: false,
    params: null
};
class HttpOptions {
    headers?: HttpHeaders | { [header: string]: string | string[]; };
    observe?: "body";
    params?: HttpParams | { [param: string]: string | string[]; };
    reportProgress?: boolean;
    responseType?: "json";
    withCredentials?: boolean;
}