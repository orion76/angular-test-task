import { tap } from 'rxjs/operators';

export function log(...args: any[]) {
  return tap((source: any) => console.log(...args, source));
}

