import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

/**
 * Service générant des modal
 */
@Injectable()
export class AfriflashModalProvider {

  /**
   * Modal du service
   */
    private modal: HTMLIonModalElement;

    constructor(private modalController: ModalController) {

    }

    /**
     * Crée une modal
     * @param comp component
     * @param css class css
     * @param props propriétés du component
     */
    public async create(comp: any, css: string, props?: {}) {
        const myModal = await this.modalController.create({
          component: comp,
          cssClass: css,
          componentProps: props
        });
        this.modal = myModal;
        return await myModal.present();
    }

    /**
     * Rejete le modal
     * @param dataToSend données à envoyer
     */
    public async dismiss(dataToSend?: any) {
      this.modalController.dismiss({
        dismissed: true,
        data: dataToSend
      });
    }

    /**
     * Retourne les données
     */
    public async getData() {
      const { data } = await this.modal.onWillDismiss();
      return data;
    }
}
