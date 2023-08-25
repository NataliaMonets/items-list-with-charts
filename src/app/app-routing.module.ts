import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ChartComponent } from './pages/chart/chart.component';
import { HighchartsComponent } from './pages/highcharts/highcharts.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(mod => mod.ProductsComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(mod => mod.ContactComponent)
    },
    {
        path: 'chart',
        loadComponent: () => import('./pages/chart/chart.component').then(mod => mod.ChartComponent)
    },
    {
        path: 'highcharts',
        loadComponent: () => import('./pages/highcharts/highcharts.component').then(mod => mod.HighchartsComponent)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
