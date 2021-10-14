import { IPrice } from '../types/shop';



export interface IProductModel  {
  id?: number;
  sku: string;
  name: string;
  description: string;
  price: IPrice;
}
