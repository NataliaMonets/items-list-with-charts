import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private apiUrl = '/api/products';

    constructor(private http: HttpClient) { }

    addProduct(product: Product) {
        return this.http.post(this.apiUrl, product);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    removeProduct(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    updateProduct(product: Product) {
        return this.http.put(`${this.apiUrl}/${product.id}`, product);
    }
}
