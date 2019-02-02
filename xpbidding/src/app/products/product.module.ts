import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
import { ProductEditComponent } from './product-edit.component';

//import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.modules';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ProductRoutingModule
    //InMemoryWebApiModule.forRoot(ProductData),
    // RouterModule.forChild([
    //   { path: 'products', component: ProductListComponent },
    //   {
    //     path: 'products/:id',
    //     canActivate: [ProductDetailGuard],
    //     component: ProductDetailComponent
    //   },
    //   {
    //     path: 'productEdit/:id',
    //     canDeactivate: [ProductEditGuard],
    //     component: ProductEditComponent
    //   },
    //])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    //ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard
  ]
})
export class ProductModule { }