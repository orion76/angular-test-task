import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';
import { selectBySku } from '../store/product.selectors';

export function existingSkuValidator(store: Store<AppState>): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return store.pipe(
      debounceTime(500),
      select(selectBySku, {sku: control.value}),
      map((product) => product ? {alreadyExist: true} : null),
      first(),
    );
  };
}
