import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AfriflashTranslateProvider {

    public constructor(private translateService: TranslateService) {}

    /**
     * Renvoie le message - asynchrone (renvoie un observable)
     * @param message message à afficher
     */
    public getMessage(message: string) {
        const translate = this.translateService.get(message);
        return translate;
    }

    /**
     * Renvoie le message - synchrone
     * @param message message à afficher
     */
    public getMessageInstant(message: string) {
        return this.translateService.instant(message);
    }
}
