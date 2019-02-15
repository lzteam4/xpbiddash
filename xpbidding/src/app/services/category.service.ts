import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductCategory } from '../entities/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>("../assets/data/productCategories.json").pipe();
  }
}
