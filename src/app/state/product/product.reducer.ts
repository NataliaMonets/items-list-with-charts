import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from "src/app/shared/interfaces/product.interface";

export interface ProductState {
    products: Product[],
    loading: boolean,
    loaded: boolean,
    error: any
}

export const initialState: ProductState = {
    products: [],
    loading: false,
    loaded: false,
    error: null
};

export const productReducer = createReducer(
    initialState,
    on(ProductActions.loadProducts, (state) => (
        { ...state, loading: true }
    )),
    on(ProductActions.loadProductsSuccess, (state, {products}) => (
        { ...state, loading: false, loaded: true, products }
    )),
    on(ProductActions.loadProductsFailure, (state, {error}) => (
        { ...state, loading: false, error }
    )),

    on(ProductActions.addProduct, (state, { product }) => (
        {...state, loading: true, loaded: false}
    )),
    on(ProductActions.addProductSuccess, (state, { product }) => (
        {...state, loading: false, loaded: true, products: [...state.products, product]}
    )),
    on(ProductActions.addProductFailure, (state, { error }) => (
        {...state, loading: false, loaded: false, error}
    )),

    on(ProductActions.removeProduct, (state, { id }) => (
        {...state, loading: true, loaded: false}
    )),
    on(ProductActions.removeProductSuccess, (state, { id }) => (
        {...state, loading: false, loaded: true, products: state.products.filter(product => product.id !== id)}
    )),
    on(ProductActions.removeProductFailure, (state, { error }) => (
        {...state, loading: false, loaded: false, error}
    )),

    on(ProductActions.updateProduct, (state, { product }) => (
        {...state, loading: true, loaded: false}
    )),
    on(ProductActions.updateProductSuccess, (state, { product }) => (
        {...state, loading: false, loaded: true, products: [ ...state.products.filter(prod => prod.id !== product.id), product]}
    )),
    on(ProductActions.updateProductFailure, (state, { error }) => (
        {...state, loading: false, loaded: false, error}
    ))
)