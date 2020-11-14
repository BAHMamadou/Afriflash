import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

/**
 * Service générant des modal
 */
@Injectable()
export class AfriflashPopoverProvider {

    private currentPopover: HTMLIonPopoverElement;

    constructor(private popoverController: PopoverController) {

    }

    /**
     * Crée un popover
     * @param comp component
     * @param css class css
     * @param props propriétés du component
     */
    public async create(comp: any, css: string, props?: {}) {
        const popover = await this.popoverController.create({
          component: comp,
          cssClass: css,
          componentProps: props
        });
        this.currentPopover = popover;
        return await popover.present();
    }

    /**
     * Faire disparaitre le popover
     */
    public dismissPopover() {
        if (this.currentPopover) {
          this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
        }
    }

}
