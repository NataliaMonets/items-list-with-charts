import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ContactComponent } from './pages/contact/contact.component';
import { HeaderComponent } from './shared/header/header.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { LoadingScreenComponent } from './shared/loading-screen/loading-screen.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartComponent } from './pages/chart/chart.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ActionsButtonRendererComponent,
        ProductModalComponent,
        ContactComponent,
        HeaderComponent,
        AlertsComponent,
        LoadingScreenComponent,
        ChartComponent
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
        EffectsModule.forRoot([ProductEffect]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [BsModalService, BsDatepickerConfig],
    bootstrap: [AppComponent]
})
export class AppModule { }
