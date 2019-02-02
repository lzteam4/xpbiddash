import { Injectable, ErrorHandler } from '@angular/core';
//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DataService } from '../_services/data.service';

@Injectable()
export class ProductService extends DataService {
    //private _productUrl = './api/products/products.json';
    //private baseUrl = 'https://3mmhj3xmwc.execute-api.us-east-1.amazonaws.com/Prod/product'; // This is base URL for angular's InMemoryWebApi service
    //private baseUrl = './api/products'; 
    constructor(_http: Http) { 
        super('../api/products/products.json', _http);
//        super('https://3mmhj3xmwc.execute-api.us-east-1.amazonaws.com/Prod/product', _http);
    }
}