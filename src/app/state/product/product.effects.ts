import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from './product.actions';
import { ProductsService } from "src/app/_services/products.service";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class ProductEffect {

    constructor(private actions$: Actions, private productService: ProductsService) { }

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            switchMap(() =>
                this.productService.getProducts().pipe(
                    map(products => ProductActions.loadProductsSuccess({ products })),
                    catchError((error) => of(ProductActions.loadProductsFailure({ error })))
                )
            )
        );
    });

    addUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.addProduct),
            switchMap(data =>
                this.productService.addProduct(data.product).pipe(
                    map(() => ProductActions.addProductSuccess({product: data.product})),
                    catchError((error) => of(ProductActions.addProductFailure({ error })))
                )
            )
        );
    });

    removeUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.removeProduct),
            switchMap(data =>
                this.productService.removeProduct(data.id).pipe(
                    map(() => ProductActions.removeProductSuccess({id: data.id})),
                    catchError((error) => of(ProductActions.removeProductFailure({ error })))
                )
            )
        );
    });

    updateUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            switchMap(data =>
                this.productService.updateProduct(data.product).pipe(
                    map(() => ProductActions.updateProductSuccess({ product: data.product })),
                    catchError((error) => of(ProductActions.removeProductFailure({ error })))
                )
            )
        );
    });

}