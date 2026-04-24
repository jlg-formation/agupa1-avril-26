import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  /**
   *
   * @param value la valeur d'entree
   * @param maxLength la val maximum
   * @returns la chaine eventuellement tronquee
   */
  transform(value: unknown, maxLength = 10): unknown {
    if (typeof value === 'string') {
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + '...';
      }
    }

    return value;
  }
}
