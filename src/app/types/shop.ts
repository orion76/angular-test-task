export type TLocales = 'ru-RU' | 'de-DE' | 'en-EN';


export interface ICurrency {
  code: string;
  name: string;
  locale: TLocales;
}

export enum ECurrency {
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
}

export interface IPrice {
  amount: number;
  currencyCode: ECurrency;
}
