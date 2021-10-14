import { NgModule } from '@angular/core';
import { ProductListComponent } from './component/list/product-list.component';
import { ProductViewComponent } from './component/view/product-view.component';
import { ProductFormComponent } from './component/form/product-form.component';
import { PRODUCT_DATA_SERVICE, ProductDataService } from './services/product-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './store/product.reducers';
import { ProductEffects } from './store/product.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../pipes/pipes.module';
import { ModalWindowModule } from '../component/modal-window/modal-window.component';
import { ModalWindowOverlayModule } from '../component/modal-window-overlay/modal-window-overlay.component';
import { PRODUCT_MESSAGE_SERVICE, ProductMessageService } from './services/product-message.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FontAwesomeModule,
    PipesModule,
    RouterModule,
    ModalWindowModule,
    ReactiveFormsModule,
    ModalWindowOverlayModule
  ],
  exports: [
    ProductListComponent,
    // ProductViewComponent,
    // ProductFormComponent,
  ],
  declarations: [
    ProductListComponent,
    ProductViewComponent,
    ProductFormComponent,
  ],
  providers: [
    {provide: PRODUCT_DATA_SERVICE, useClass: ProductDataService},
    {provide: PRODUCT_MESSAGE_SERVICE, useClass: ProductMessageService},

  ],
  entryComponents: [
    ProductViewComponent,
    ProductFormComponent,
  ]
})
export class ProductModule {
}
