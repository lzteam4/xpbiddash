import { Injectable, ErrorHandler } from '@angular/core';
//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { DataService } from '../_services/data.service';

@Injectable()
export class ProductService extends DataService {
    constructor(_http: Http) { 
        //super('../api/products/products.json', _http);
        super('https://3mmhj3xmwc.execute-api.us-east-1.amazonaws.com/Prod/product', _http);
    }
}