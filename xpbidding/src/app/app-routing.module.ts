import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: '../app/modules/auth/auth.module#AuthModule'
  },
  {
    path: 'profile',
    loadChildren: '../app/modules/profile/profile.module#ProfileModule'
  },
  { 
    path: 'products',
   loadChildren: '../app/modules/product/product.module#ProductModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
