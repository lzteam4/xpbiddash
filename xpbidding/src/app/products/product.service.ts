import { Injectable, ErrorHandler } from '@angular/core';
//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private _productUrl = './api/products/products.json';
    private baseUrl = 'api/products'; // This is base URL for angular's InMemoryWebApi service

    constructor(private _http: Http) { }

    getProducts(): Observable<IProduct[]> {

        return this._http.get(this.baseUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .map(this.extractProducts)
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        const url = `${this.baseUrl}/${id}`;
        return this._http.get(url)
            .map(this.extractProduct)
            .do(data => console.log("get product:" + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        if (product.id === undefined) {
            return this.createProduct(product, options);
        }
        return this.updateProduct(product, options);
    }

    createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        product.id = undefined;
        return this._http.post(this.baseUrl, product, options)
            .map(this.extractProduct)
            .do(data => console.log('create product:' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`;
        return this._http.put(url, product, options)
            .map(() => product)
            .do(data => console.log('update product:' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(id: number): Observable<Response> {
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        const url = `${this.baseUrl}/${id}`;

        return this._http.delete(url, options)
            .do(data => console.log('delete product:' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractProduct(res: Response) {
        let response = res.json();
        return <IProduct>(response.data);
    }

    private extractProducts(res: Response) {
        let response = res.json();
        //return <IProduct[]>(res.json());
        return response.data || {};
    }

    private handleError(err: Response) {
        console.error(err);
        return Observable.throw(err.json().error);
    }
}