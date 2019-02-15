import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SharedModule } from '../shared/shared.module';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent, ProductEditComponent],
  imports: [
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DataViewModule,
    DropdownModule
  ]
})
export class ProductModule { }
