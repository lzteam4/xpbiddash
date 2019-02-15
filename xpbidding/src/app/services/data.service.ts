import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map, tap, catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import { BadRequestError,NotFoundError, AppError } from '../helpers/errors';

@Injectable({
  providedIn: 'root'
})
export class DataService {

//      httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type':  'text/plain',
//          'Access-Control-Allow-Origin': '*'
//         })
//       };

  // constructor(private baseUrl: string, private _http: HttpClient) { }

//     getAll(): Observable<any[]> {

//         return this._http.get(this.baseUrl)
//             //.do(data => console.log('All: ' + JSON.stringify(data)))
//             .pipe(
//                 map(this.extractMultipleData),
//                 catchError(this.handleError)
//             )

//     }

//     get(id: number): Observable<any> {
//         const url = `${this.baseUrl}/${id}`;
//         return this._http.get(url)
//             .pipe(
//                 map(this.extractData),
//                 //.do(data => console.log("Get data:" + JSON.stringify(data)))
//                 catchError(this.handleError)
//             );
//     }

//     save(resource: any): Observable<any> {
//         let options =null
//         if (resource.Id === undefined) {
//             return this.create(resource);
//         }
//         return this.update(resource);
//     }

//     create(resource: any): Observable<any> {
//         resource.Id = undefined;
//         return this._http.post(this.baseUrl, resource)//, this.httpOptions)
//             .pipe(
//                 map(this.extractData),
//                 tap(data => console.log('Create:' + JSON.stringify(data))),
//                 catchError(this.handleError)
//             )
//     }

//     update(resource: any): Observable<any> {
//         const url = `${this.baseUrl}/${resource.Id}`;
//         return this._http.put(url, resource)//, this.httpOptions)
//             .pipe(
//                 map(() => resource),
//                 tap(data => console.log('Update:' + JSON.stringify(data))),
//                 catchError(this.handleError)
//             )
//     }

//     delete(id: string): Observable<any> {
        
//         const url = `${this.baseUrl}/${id}`;

//         return this._http.delete(url)
//             .pipe(
//                 tap(data => console.log('Delete:' + JSON.stringify(data))),
//                 catchError(this.handleError)
//             )
//         return null;
//     }

//     private extractData(res: Response) {
//         // let response = res.json();
//         // console.log("Data is:" + response.data);
//         // return response.data || {};
//         return null;
//     }

//     private extractMultipleData(res: Response): any[] {

//         let response = res.json();
//         console.log("Data is:" + response);
//         //return <any[]>(response);
//         return null;
//     }

//     private handleError(err: Response) {
//         console.error(err);

//         if (err.status === 400)
//             return Observable.throw(new BadRequestError(err.json()));

//         if (err.status === 404)
//             return Observable.throw(new NotFoundError(err.json()));

//         return Observable.throw(new AppError(err.json()));
//     }
}
