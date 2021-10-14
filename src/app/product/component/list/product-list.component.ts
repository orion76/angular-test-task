import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductModel } from '../../product.model';
import { Store } from '@ngrx/store';
import { PRODUCT_DATA_SERVICE } from '../../services/product-data.service';
import { productActions } from '../../store/product.actions';
import { getAllProducts, selectProduct } from '../../store/product.selectors';
import { AppState } from '../../../store/reducers';
import { IProductDataService, IProductMessageService } from '../../types';
import { MODAL_SERVICE } from '../../../component/modal-window-overlay/modal.service';
import { IModalService } from '../../../component/types';
import { take } from 'rxjs/operators';
import { ProductViewComponent } from '../view/product-view.component';
import { ProductFormComponent } from '../form/product-form.component';
import { PRODUCT_MESSAGE_SERVICE } from '../../services/product-message.service';

@Component({
  selector: 'product-list',
  templateUrl: 'product-list.component.html'
})

export class ProductListComponent implements OnInit {

  products$: Observable<IProductModel[]>;

  constructor(@Inject(PRODUCT_DATA_SERVICE) private productService: IProductDataService,
              @Inject(MODAL_SERVICE) private modalService: IModalService,
              @Inject(PRODUCT_MESSAGE_SERVICE) private messageService: IProductMessageService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.products$ = this.store.select(getAllProducts);
  }

  viewItem(id: number): void {
    this.store.select(selectProduct, {id})
      .pipe(take(1))
      .subscribe((product) => {
          this.modalService.open({title: 'View', component: ProductViewComponent, inputs: {product}});
        }
      );
  }


  editItem(id: number): void {
    this.store.select(selectProduct, {id})
      .pipe(take(1))
      .subscribe((product) => {
          this.modalService.open({title: 'View', component: ProductFormComponent, inputs: {product}});
        }
      );
  }

  deleteItem(product: IProductModel): void {
    const {id, name, sku} = product as Required<IProductModel>;
    this.messageService.confirmDelete(id, name, sku).subscribe(() => {
      this.store.dispatch(productActions.deleteItem({id}));
    });

  }
}


