import { createAction, props, union } from '@ngrx/store';
import { IProductModel } from '../product.model';
import { UpdateNum } from '@ngrx/entity/src/models';

export enum EProductActions {
  LOAD_ALL = '[Products List] LOAD_ALL',
  LOAD_ALL_SUCCESS = '[Product] LOAD_ALL_SUCCESS',
  LOAD_ALL_ERROR = '[Product] LOAD_ALL_ERROR',
  CREATE_ITEM = '[Product] CREATE_ITEM',
  CREATE_ITEM_SUCCESS = '[Product] CREATE_ITEM_SUCCESS',
  CREATE_ITEM_ERROR = '[Product] CREATE_ITEM_ERROR',
  UPDATE_ITEM = '[Product] UPDATE_ITEM',
  UPDATE_ITEM_SUCCESS = '[Product] UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_ERROR = '[Product] UPDATE_ITEM_ERROR',
  DELETE_ITEM = '[Product] DELETE_ITEM',
  DELETE_ITEM_SUCCESS = '[Product] DELETE_ITEM_SUCCESS',
  DELETE_ITEM_ERROR = '[Product] DELETE_ITEM_ERROR',
}

export const loadAll = createAction(
  EProductActions.LOAD_ALL
);
export const loadAllSuccess = createAction(
  EProductActions.LOAD_ALL_SUCCESS,
  props<{ products: IProductModel[] }>()
);
export const loadAllError = createAction(
  EProductActions.LOAD_ALL_ERROR,
  props<{ error: string }>()
);


export const createItem = createAction(
  EProductActions.CREATE_ITEM,
  props<{ product: IProductModel }>()
);

export const createItemSuccess = createAction(
  EProductActions.CREATE_ITEM_SUCCESS,
  props<{ product: IProductModel }>()
);


export const createItemError = createAction(
  EProductActions.CREATE_ITEM_ERROR,
  props<{ product: IProductModel, error: string }>()
);


export const updateItem = createAction(
  EProductActions.UPDATE_ITEM,
  props<{ update: UpdateNum<IProductModel> }>()
);


export const updateItemSuccess = createAction(
  EProductActions.UPDATE_ITEM_SUCCESS,
  props<{ update: UpdateNum<IProductModel> }>()
);


export const updateItemError = createAction(
  EProductActions.UPDATE_ITEM_ERROR,
  props<{ update: UpdateNum<IProductModel>, error: string }>()
);

export const deleteItem = createAction(
  EProductActions.DELETE_ITEM,
  props<{ id: number }>()
);
export const deleteItemSuccess = createAction(
  EProductActions.DELETE_ITEM_SUCCESS,
  props<{ id: number }>()
);


export const deleteItemError = createAction(
  EProductActions.DELETE_ITEM_ERROR,
  props<{ id: number, error: string }>()
);

export const productActions = {
  loadAll,
  loadAllSuccess,
  loadAllError,
  createItem,
  createItemSuccess,
  createItemError,
  updateItem,
  updateItemSuccess,
  updateItemError,
  deleteItem,
  deleteItemSuccess,
  deleteItemError,

};

const all = union({
  loadAll,
  loadAllSuccess,
  loadAllError,
  createItem,
  createItemSuccess,
  createItemError,
  updateItem,
  updateItemSuccess,
  updateItemError,
  deleteItem,
  deleteItemSuccess,
  deleteItemError,

});

export type productActionsTypes = typeof all;
