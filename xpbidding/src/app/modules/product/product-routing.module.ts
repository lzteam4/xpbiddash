import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'detail/:productId',
    // canActivate: [ProductDetailGuard],
    component: ProductDetailComponent
  },
  {
    path: 'edit/:productId',
    // canDeactivate: [ProductEditGuard],
    component: ProductEditComponent
  },
  {
    path: 'add',
    // canDeactivate: [ProductEditGuard],
    component: ProductEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
