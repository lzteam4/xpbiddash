import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../entities/product';
import { ApiConfig } from '../helpers/config/api-config';
//import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService { //extends DataService {

  constructor(private http: HttpClient) {
       // super(ApiConfig.baseUrl + ApiConfig.product, http);
    }


  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(ApiConfig.baseUrl + ApiConfig.product).pipe();
  }

  getProduct(productId: string): Observable<IProduct> {
    return this.http.get<IProduct>(ApiConfig.baseUrl + ApiConfig.product + "/" + productId).pipe();
  }
  deleteProduct(productId: string): Observable<any>{
    return this.http.delete(ApiConfig.baseUrl + ApiConfig.product + "/" + productId).pipe();
  }
  saveProduct(product: IProduct){
    if(product.Id){
      return this.http.put(ApiConfig.baseUrl + ApiConfig.product+ "/" + product.Id, product).pipe();
    }

    return this.http.post(ApiConfig.baseUrl + ApiConfig.product, product).pipe();
  }
}