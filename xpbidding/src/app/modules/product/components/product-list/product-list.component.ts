import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entities';
import { ProductService } from 'src/app/services';
import {SelectItem} from 'primeng/api';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    products: IProduct[] = [];
    sortOptions: SelectItem[];

    sortKey: string;
    sortField: string;
    sortOrder: number;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts()
            .subscribe(products => {
                this.products = products;
            });

            this.sortOptions = [
                {label: 'Name', value: 'Name'},
                {label: 'Category', value: 'Category'}
            ];
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
