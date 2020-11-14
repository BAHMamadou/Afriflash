import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Methodes pour le bon fonctionnement de l'application
 */
@Injectable()
export class AfriflashUtilsProvider {

    public constructor(private translateService: TranslateService) {}


    /**
     * Permet gerer l'affichage d'un nombre en prenant en compte les dizaines, centaines etc ...
     * @param price prix
     */
    public customizeNumber(nbr: number) {
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