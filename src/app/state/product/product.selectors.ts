import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

export const productsState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(productsState,
    (state: ProductState) => {
        return state.products;
    }
);

export const selectLoading = createSelector(productsState,
    (state: ProductState) => {
        return state.loading;
    }
);

export const selectLoaded = createSelector(productsState,
    (state: ProductState) => {
        return state.loaded;
    }
);

export const selectError = createSelector(productsState,
    (state: ProductState) => {
        return state.error;
    }
);