import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { selectError, selectLoaded, selectLoading, selectProducts } from 'src/app/state/product/product.selectors';
import * as ProductActions from '../../state/product/product.actions';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ActionsButtonRendererComponent } from './actions-button-renderer/actions-button-renderer.component';
import { ProductModalComponent } from 'src/app/shared/product-modal/product-modal.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public products$: Observable<Product[]> = this.store.select(selectProducts);
    public loading$: Observable<boolean> = this.store.select(selectLoading);
    public loaded$: Observable<boolean> = this.store.select(selectLoaded);
    public error$: Observable<any> = this.store.select(selectError);

    public columnDefs: ColDef[] = [
        { headerName: 'Id', field: 'id', rowDrag: true },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Price', field: 'price' },
        { headerName: 'Year', field: 'year' },
        { headerName: 'Actions', filter: false, sortable: false, cellRenderer: ActionsButtonRendererComponent }
    ];

    public defaultColDef: ColDef = {
        sortable: true,
        filter: true
    };

    @ViewChild(AgGridAngular) agGrid: AgGridAngular;
    @ViewChild('addProductModalComponent') addProductModalComponent: ProductModalComponent;

    constructor(private store: Store) { }

    ngOnInit(): void {
        this.store.dispatch(ProductActions.loadProducts());
    }

    public addProduct(productData) {
        const product: Product = {
            ...productData,
            id: this.agGrid.api.getDisplayedRowCount() + 1
        }

        this.store.dispatch(ProductActions.addProduct({ product }));
    }

    public onGridReady(params: GridReadyEvent) {
        params.api.sizeColumnsToFit();
        window.addEventListener('resize', function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    }

    public onCellClicked(e: CellClickedEvent): void {
        console.log('cellClicked', e);
    }

    public clearSelection(): void {
        this.agGrid.api.deselectAll();
    }

    public openProductModal(): void {
        this.addProductModalComponent.openModal();
    }

}
