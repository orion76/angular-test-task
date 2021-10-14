import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { areProductsLoaded } from '../store/product.selectors';
import { productActions } from '../store/product.actions';
import { AppState } from '../../store/reducers';


@Injectable()
export class ProductListResolver implements Resolve<boolean> {

  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {

    return this.store.pipe(
      select(areProductsLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(productActions.loadAll());
        }
      }),
      filter(loaded => !!loaded),
      first()
    );

  }

}
