import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import * as Highcharts from 'highcharts';
import { ProductsService } from 'src/app/_services/products.service';
import { Product } from 'src/app/shared/interfaces/data.interface';

@Component({
    selector: 'app-highcharts',
    templateUrl: './highcharts.component.html',
    styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {
    private translate: TranslateService = inject(TranslateService);
    private productService: ProductsService = inject(ProductsService);
    private destroyRef: DestroyRef = inject(DestroyRef);
    public productsData: Product[];
    public Highcharts: typeof Highcharts = Highcharts;
    public chartOptions;
    public barChartOptions;
    public pieChartOptions;

    ngOnInit(): void {
        this.loadProductsData();
        this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
           if (this.productsData) {
            this.createCharts();
           }
        });
    }

    private loadProductsData(): void {
        this.productService.getProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            this.productsData = data;
            this.createCharts();
        });
    }

    private createCharts(): void {
        this.chartOptions = {
            chart: {
                type: 'line'
            },
            title: {
                text: this.translate.instant('itemsPrice')
            },
            series: [{
                name: this.translate.instant('columnPrice'),
                data: this.productsData.map(item => item.price)
            }],
            yAxis: {
                title: {
                    text: this.translate.instant('itemsPrice')
                },

            },
            xAxis: {
                categories: this.productsData.map(item => item.name)
            },
        };

        this.barChartOptions = {
            chart: {
                type: 'bar'
            },
            title: {
                text: this.translate.instant('modalFieldProductYear')
            },
            series: [{
                name: this.translate.instant('columnYear'),
                data: this.productsData.map(item => item.year)
            }],
            yAxis: {
                min: 1990,
                title: {
                    text: this.translate.instant('modalFieldProductYear')
                }
            },
            xAxis: {
                categories: this.productsData.map(item => item.name)
            }
        };

        this.pieChartOptions = {
            title: {
                text: this.translate.instant('itemsPrice')
            },
            series: [{
                name: this.translate.instant('columnPrice'),
                data: this.productsData.map(item => ([item.name,item.price])),
                type: 'pie',
            }],
            plotOptions : {
                pie: {
                   allowPointSelect: true,
                   cursor: 'pointer',
                   showInLegend: true
                }
             }
        };
    }
}
