import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
