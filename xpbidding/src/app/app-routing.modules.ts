import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./home/welcome.component";
// import { LoginComponent } from "./login/login.component";
// import { HomeComponent } from "./home/home.component";
// import { AuthGuard } from "./_guards/auth.guard";
//import { ProductListComponent } from "../app/products/product-list.component";

const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products', loadChildren: "../app/products/product.module#ProductModule" },
    { path: 'mix', loadChildren: "../app/mix/mix.module#MixModule" },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }