import { ICurrency } from '../types/shop';

export const currenciesData: Record<string, ICurrency> = {
  RUB: {code: 'RUB', name: 'Рубль', locale: 'ru-RU'},
  EUR: {code: 'EUR', name: 'Евро',  locale: 'de-DE'},
  USD: {code: 'USD', name: 'Доллар', locale: 'en-EN'},
};
