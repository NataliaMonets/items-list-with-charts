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
        component: ProductsComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'chart',
        component: ChartComponent
    },
    {
        path: 'highcharts',
        component: HighchartsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
