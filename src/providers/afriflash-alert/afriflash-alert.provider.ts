import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Service permetant de générer des alerts
 */
@Injectable()
export class AfriflashAlertProvider {

    constructor(private alertController: AlertController, private translate: TranslateService) {

    }

  /**
   * Affiche une dialog d'information
   * @param message message à afficher
   * @param css classe(s) CSS
   * @param boutons boutons de l'alert
   */
    public async alertMessage(message: string, css: string, boutons: {
        text: string,
        // tslint:disable-next-line: ban-types
        handler: any
    }[]) {

        const alert = await this.alertController.create({
        header: this.translate.instant(message),
        cssClass: css,
        buttons: boutons
        });
        await alert.present();
    }

    /**
     *
     * @param message message de l'alert
     * @param css classe css
     * @param input les inputs
     * @param boutons boutons de l'alert
     */
    public async alertInput(message: string, css: string, input: any[], boutons: {
        text: string,
        // tslint:disable-next-line: ban-types
        handler: any
    }[]) {

        const alert = await this.alertController.create({
            header: this.translate.instant(message),
            cssClass: css,
            inputs: input,
            buttons: boutons
        });
        await alert.present();
        const result = await alert.onDidDismiss();
        return result;
    }

}
