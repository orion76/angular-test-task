import { IProductModel } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { createItemSuccess, deleteItemSuccess, loadAllSuccess, updateItemSuccess } from './product.actions';


export interface ProductState extends EntityState<IProductModel> {
  productsLoaded: boolean;
  entityCreate: Partial<IProductModel>;
  entityEdit: IProductModel;
  entityView: IProductModel;
}

export const adapter: EntityAdapter<IProductModel> = createEntityAdapter<IProductModel>();

export const initialState = adapter.getInitialState({
  productsLoaded: false
});

export const productReducer = createReducer(
  initialState,

  on(loadAllSuccess, (state, action) => {
    return adapter.addMany(
      action.products,
      {...state, productsLoaded: true}
    );
  }),

  on(createItemSuccess, (state, action) => {
    console.log('createItemSuccess', action);
    return adapter.addOne(action.product, state);
  }),

  on(deleteItemSuccess, (state, action) => {
    return adapter.removeOne(action.id, state);
  }),

  on(updateItemSuccess, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
);

