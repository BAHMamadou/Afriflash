import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {

  transform(nbr: any, ...args: any[]): any {
    const nombre = '' + nbr;
    let retour = '';
    let count = 0;
    for (let i = nombre.length - 1 ; i >= 0 ; i--) {
            if (count !== 0 && count % 3 === 0)  {
                retour = nombre[i] + ' ' + retour ;
            } else {
                retour = nombre[i] + retour ;
            }
            count ++;
        }
    return retour;
  }

}
