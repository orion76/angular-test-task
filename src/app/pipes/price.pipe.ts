import { Pipe, PipeTransform } from '@angular/core';
import { IPrice } from '../types/shop';
import { currenciesData } from '../data/currencies.data';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(price: IPrice, args?: any): string {
    const {amount, currencyCode} = price;
    const currency = currenciesData[currencyCode];
    return new Intl.NumberFormat(currency.locale, {style: 'currency', currency: currency.code}).format(amount);
  }
}
