import { AlertController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'afriflash-button',
  templateUrl: './afriflash-button.component.html',
  styleUrls: ['./afriflash-button.component.scss'],
})
/**
 * Bouton utilisé sur les menus
 * Couleur configurable en passant le thème css
 * Titre, sous-titre et icon configurable
 */
export class AfriflashButtonComponent implements OnInit {

  /**
   * Titre du bouton
   */
  @Input() title: string;

  /**
   * Sous-titre du bouton
   */
  @Input() subTitle: string;

  /**
   * Icon: Image du bouton
   */
  @Input() icon: string;

  /**
   * Visibilité de l'icone de favoris
   */
  @Input() favoriteVisible: boolean;

  /**
   * L'état du favoris
   */
  @Input() isFavorite: boolean;

  /**
   * Paramètre de configuration du visuel du bouton
   */
  @Input() theme: string;

  /**
   * Evenement émis lors du click du bouton
   */
  @Output() clickButton = new EventEmitter<string>();

  /**
   * Evenement émis lors du click du bouton de favori
   */
  @Output() clickFavorite = new EventEmitter<boolean>();



  /**
   * Test si la plateforme est de type web ou non
   */
  @Input() public isWeb: boolean;


  /**
   * Constructeur du composant
   */
  constructor(public alertController: AlertController, private translate: TranslateService) { }

  /**
   * Cycle de vie : initiatilisation du composant
   */
  ngOnInit() { }

  /**
   * Emet un évenement lors du clic
   * @param state
   */
  public clickedFavorite(state: boolean) {
    this.clickFavorite.emit(state);
  }

  /**
   * Détection du clique sur le bouton favoris
   */
  public changeStateFavorite(event: Event) {
    event.stopPropagation();
    event.cancelBubble = true;
    if (!this.isFavorite) {
      this.presentAlert();
    }
    this.isFavorite = !this.isFavorite;

  }

  /**
   * Affiche une dialog d'information
   */
  private async presentAlert() {
    const alert = await this.alertController.create({
      header: this.translate.instant('ALERT.ALERT_FAVORIS.TITLE'),
      buttons: [this.translate.instant('ALERT.ALERT_FAVORIS.OK')]
    });

    await alert.present();
  }

}
