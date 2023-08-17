import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Product } from 'src/app/shared/interfaces/data.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from 'src/app/_services/products.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    private translate: TranslateService = inject(TranslateService);
    private productService: ProductsService = inject(ProductsService);
    private destroyRef: DestroyRef = inject(DestroyRef);
    public productsData: Product[] = [];
    private lineChart: any;
    private barChart: any;
    private chartsData;

    ngOnInit(): void {
        this.loadProductsData();
    }

    private loadProductsData(): void {
        this.productService.getProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
            this.productsData = data;
            this.createChart();
        });
    }

    private createChart(): void {
        this.chartsData = {
            data: {
                labels: this.productsData.map(item => item.name),
                datasets: [
                    {
                        label: this.translate.instant('columnPrice'),
                        data: this.productsData.map(item => item.price.toString()),
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    },
                    {
                        label: this.translate.instant('modalFieldProductYear'),
                        data: this.productsData.map(item => item.year.toString()),
                        backgroundColor: 'rgba(255, 159, 64, 0.5)'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        this.barChart = new Chart("barChart", {
            type: 'bar',
            ...this.chartsData
        });

        this.lineChart = new Chart("lineChart", {
            type: 'line',
            ...this.chartsData
        });

        this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(changes => {
            this.chartsData.data.datasets[0].label = changes.translations['columnPrice'];
            this.chartsData.data.datasets[1].label = changes.translations['modalFieldProductYear'];
            this.barChart.update();
            this.lineChart.update()
        });
    }
}
