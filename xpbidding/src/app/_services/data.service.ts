import { Injectable, ErrorHandler } from '@angular/core';
//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { BadRequestError } from '../common/badRequest.error';
import { NotFoundError } from '../common/notFound.error';
import { AppError } from '../common/appError';

@Injectable()
export class DataService {

    constructor(private baseUrl: string, private _http: Http) { }

    getAll(): Observable<any[]> {

        return this._http.get(this.baseUrl)
            //.do(data => console.log('All: ' + JSON.stringify(data)))
            .pipe(
                map(this.extractMultipleData),
                catchError(this.handleError)
            )

    }

    get(id: number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this._http.get(url)
            .pipe(
                map(this.extractData),
                //.do(data => console.log("Get data:" + JSON.stringify(data)))
                catchError(this.handleError)
            );
    }

    save(resource: any): Observable<any> {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        if (resource.id === undefined) {
            return this.create(resource, options);
        }
        return this.update(resource, options);
    }

    create(resource: any, options: RequestOptions): Observable<any> {
        resource.id = undefined;
        return this._http.post(this.baseUrl, resource, options)
            .pipe(
                map(this.extractData),
                tap(data => console.log('Create:' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    update(resource: any, options: RequestOptions): Observable<any> {
        const url = `${this.baseUrl}/${resource.id}`;
        return this._http.put(url, resource, options)
            .pipe(
                map(() => resource),
                tap(data => console.log('Update:' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    delete(id: number): Observable<Response> {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        const url = `${this.baseUrl}/${id}`;

        return this._http.delete(url, options)
            .pipe(
                tap(data => console.log('Delete:' + JSON.stringify(data))),
                catchError(this.handleError)
            )
    }

    private extractData(res: Response) {
        let response = res.json();
        console.log("Data is:" + response.data);
        return response.data || {};
    }

    private extractMultipleData(res: Response): any[] {

        let response = res.json();
        console.log("Data is:" + response);
        //return <IProduct[]>(res.json());
        return <any[]>(response);
    }

    private handleError(err: Response) {
        console.error(err);

        if (err.status === 400)
            return Observable.throw(new BadRequestError(err.json()));

        if (err.status === 404)
            return Observable.throw(new NotFoundError(err.json()));

        return Observable.throw(new AppError(err.json()));
    }
}