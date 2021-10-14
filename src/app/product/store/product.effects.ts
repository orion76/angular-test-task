import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { productActions, productActionsTypes } from './product.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { PRODUCT_DATA_SERVICE } from '../services/product-data.service';
import { IProductDataService, IProductMessageService } from '../types';
import { IProductModel } from '../product.model';
import { PRODUCT_MESSAGE_SERVICE } from '../services/product-message.service';
import { Observable, of } from 'rxjs';
import { UpdateNum } from '@ngrx/entity/src/models';
import { log } from '../../utils/rxjs.util';


@Injectable()
export class ProductEffects {

  loadAll$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.loadAll),
    mergeMap((action) => this.loadAll()),
  ));
  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.createItem),
    mergeMap((action) => this.createItem(action.product)),
  ));


  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.deleteItem),
    mergeMap((action) => this.deleteItem(action.id)),
  ));

  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.updateItem),

    mergeMap((action) => this.updateItem(action.update),
    )));


  loadAll(): Observable<productActionsTypes> {
    return this.productService.getAll().pipe(
      map((products) => productActions.loadAllSuccess({products})),

      catchError((error) => {
        this.messageService.errorGetAll(error);
        return of(productActions.loadAllError({error}));
      }),
    );
  }

  createItem(product: IProductModel): Observable<productActionsTypes> {
    return this.productService.create(product).pipe(
      map((products) => productActions.createItemSuccess({product})),

      catchError((error) => {
        this.messageService.errorCreate(product, error);
        return of(productActions.createItemError({product, error}));
      }),
    );
  }


  deleteItem(id: number): Observable<productActionsTypes> {
    return this.productService.delete(id).pipe(
      map((products) => productActions.deleteItemSuccess({id})),

      catchError((error) => {
        this.messageService.errorDelete(id, error);
        return of(productActions.deleteItemError({id, error}));
      }),
    );
  }


  updateItem(update: UpdateNum<IProductModel>): Observable<productActionsTypes> {
    return this.productService.update(update.changes).pipe(
      map((product) => ({id: product.id!, changes: product})),
      map((update_product) => productActions.updateItemSuccess({update: update_product})),
      catchError((error) => {
        this.messageService.errorUpdate(update, error);
        return of(productActions.updateItemError({update, error}));
      }),
    );
  }


  constructor(@Inject(PRODUCT_DATA_SERVICE) private productService: IProductDataService,
              @Inject(PRODUCT_MESSAGE_SERVICE) private messageService: IProductMessageService,
              private actions$: Actions<productActionsTypes>,
  ) {
  }


}
