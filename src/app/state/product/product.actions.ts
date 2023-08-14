import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/shared/interfaces/data.interface";

export const loadProducts = createAction('[Product Component] Load Products');
export const loadProductsSuccess = createAction('[Product Component] Load Products Success', props<{products: Product[]}>());
export const loadProductsFailure = createAction('[Product Component] Load Products Failure', props<{error: any}>());

export const addProduct = createAction('[Product Component] Add Product', props<{product: Product}>());
export const addProductSuccess = createAction('[Product Component] Add Product Success', props<{product: Product}>());
export const addProductFailure = createAction('[Product Component] Add Product Failure', props<{error: any}>());

export const removeProduct = createAction('[Product Component] Remove Product', props<{id: string}>());
export const removeProductSuccess = createAction('[Product Component] Remove Product Success', props<{id: string}>());
export const removeProductFailure = createAction('[Product Component] Remove Product Failure', props<{error: any}>());

export const updateProduct = createAction('[Product Component] Update Product', props<{product: Product}>());
export const updateProductSuccess = createAction('[Product Component] Update Product Success', props<{product: Product}>());
export const updateProductFailure = createAction('[Product Component] Update Product Failure', props<{error: any}>());