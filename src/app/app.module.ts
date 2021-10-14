import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDataInterceptor } from './services/product-data.interceptor';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ModalWindowOverlayModule } from './component/modal-window-overlay/modal-window-overlay.component';
import { ModalWindowModule } from './component/modal-window/modal-window.component';
import { ProductModule } from './product/product.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/component/list/product-list.component';
import { ProductListResolver } from './product/services/product-list.resolver';
import { ModalMessageModule } from './component/modal-message/modal-message.component';


export const productRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {list: ProductListResolver}
  },
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(productRoutes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {metaReducers}),
    ModalWindowOverlayModule,
    ModalWindowModule,
    ProductModule,
    ModalMessageModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ProductDataInterceptor, multi: true},
    ProductListResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
