import { Component, DestroyRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/interfaces/data.interface';
import { selectError, selectLoaded, selectLoading, selectProducts } from 'src/app/state/product/product.selectors';
import * as ProductActions from '../../state/product/product.actions';
import { CellClickedEvent, ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ActionsButtonRendererComponent } from './actions-button-renderer/actions-button-renderer.component';
import { ProductModalComponent } from 'src/app/shared/product-modal/product-modal.component';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    private store: Store = inject(Store);
    private readonly translate: TranslateService = inject(TranslateService);
    private destroyRef: DestroyRef = inject(DestroyRef);
    public products$: Observable<Product[]> = this.store.select(selectProducts);
    public loading$: Observable<boolean> = this.store.select(selectLoading);
    public loaded$: Observable<boolean> = this.store.select(selectLoaded);
    public error$: Observable<any> = this.store.select(selectError);

    public columnDefs: ColDef[] = [
        { headerName: 'Id', field: 'id' },
        { headerName: 'formFieldName', field: 'name', headerValueGetter: this.localizeHeader.bind(this) },
        { headerName: 'columnPrice', field: 'price', headerValueGetter: this.localizeHeader.bind(this) },
        { headerName: 'columnYear', field: 'year', headerValueGetter: this.localizeHeader.bind(this) },
        { headerName: 'columnAction', field: 'action', filter: false, sortable: false, headerValueGetter: this.localizeHeader.bind(this), cellRenderer: ActionsButtonRendererComponent }
    ];

    public defaultColDef: ColDef = {
        sortable: true,
        filter: true
    };

    @ViewChild(AgGridAngular) agGrid: AgGridAngular;
    @ViewChild('addProductModalComponent') addProductModalComponent: ProductModalComponent;

    ngOnInit(): void {
        this.store.dispatch(ProductActions.loadProducts());
        this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.agGrid.api.refreshHeader());
        this.translate.onDefaultLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.agGrid.api.refreshHeader());
    }

    public addProduct(productData) {
        const product: Product = {
            ...productData,
            id: this.agGrid.api.getDisplayedRowCount() + 1
        }

        this.store.dispatch(ProductActions.addProduct({ product }));
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

    public clearRangeSelection(): void {
        this.agGrid.api.clearRangeSelection();
    }

    private localizeHeader(parameters: ICellRendererParams): string {
        let headerIdentifier = parameters.colDef.headerName;
        return this.translate.instant(headerIdentifier);
    }

}
