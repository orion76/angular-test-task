import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ProductState } from './product.reducers';
import { Dictionary } from '@ngrx/entity';
import { IProductModel } from '../product.model';


export const {selectAll, selectIds, selectEntities} = adapter.getSelectors();

export const productsFeatureSelector = createFeatureSelector<ProductState>('products');


export const getAllProducts = createSelector(
  productsFeatureSelector,
  selectAll
);

export const selectProducts = createSelector(
  productsFeatureSelector,
  selectEntities
);

export const areProductsLoaded = createSelector(
  productsFeatureSelector,
  state => state.productsLoaded
);

export const selectProductsEdit = createSelector(
  productsFeatureSelector,
  state => state.entityEdit
);

function findMaxId(products: IProductModel[]): number {

  const sorted = products
    .map((product) => product.id)
    .sort((a, b) => Number(a) - Number(b));

  return sorted?.pop() || 0;

}

function findSku(products: IProductModel[], props: { sku: string }): IProductModel | null {
  return products.find((product) => product.sku === props.sku) || null;
}

export const selectMaxId = createSelector(
  getAllProducts,
  findMaxId
);

export const selectBySku = createSelector(
  getAllProducts,
  findSku
);

export const selectProductsCreate = createSelector(
  productsFeatureSelector,
  state => state.entityCreate
);

export const selectProductsView = createSelector(
  productsFeatureSelector,
  state => state.entityView
);

export const selectProduct = createSelector(
  selectProducts,
  (products: Dictionary<IProductModel>, props: { id: number }) => products[props.id]
);
