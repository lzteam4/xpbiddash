import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailGuard, ProductEditGuard } from "./product-guard.service";
import { ProductDetailComponent } from "./product-detail.component";
import { ProductEditComponent } from "./product-edit.component";
//import { AgGridModule } from "ag-grid-angular/main";

const routes: Routes = [
    { path: 'products', component: ProductListComponent },
    {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
    },
    {
        path: 'productEdit/:id',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }