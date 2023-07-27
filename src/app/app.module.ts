import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product/product.reducer';
import { ProductsComponent } from './pages/products/products.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './state/product/product.effects';
import { ActionsButtonRendererComponent } from './pages/products/actions-button-renderer/actions-button-renderer.component';
import { ProductModalComponent } from './shared/product-modal/product-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import 'ag-grid-enterprise';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ActionsButtonRendererComponent,
        ProductModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
        AgGridModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ products: productReducer }),
        EffectsModule.forRoot([ProductEffect])
    ],
    providers: [BsModalService, BsDatepickerConfig],
    bootstrap: [AppComponent]
})
export class AppModule { }
