import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AfriflashConfigProvider } from 'src/providers/afriflash-config/afriflash-config.provider';


@Component({
  selector: 'afriflash-ads',
  templateUrl: './afriflash-ads.component.html',
  styleUrls: ['./afriflash-ads.component.scss'],
})
export class AfriflashAdsComponent implements OnInit {

  /**
   * Liste des annonces
   */
  @Input() public ads: any[];

  /**
   * Nombre d'annonces par page
   */
  @Input() public itemsPerPage: number;

  /**
   * Position de la page courante
   */
  @Input() public currentPage: number;

  /**
   * Emet la position de la page actuel
   */
  @Output() public position = new EventEmitter<any>();

 /**
  * Emet l'identifiant de l'annonce cliquée
  */
 @Output() public emitId = new EventEmitter<any>();

  /**
   * Test si la platform est de type web
   */
  public isWeb = false;

  /**
   * Verification s'i la page est mes annonces
   */
  @Input() public myadd = false;

  constructor(private config: AfriflashConfigProvider) { }

  ngOnInit() {
    this.isWeb = this.config.isWeb();
  }

  /**
   * Traite la partie des filtres
   * @param choice choix des filtres
   */
  public handle(choice: string) {
  }

  /**
   * Emet la position (page actuel)
   * @param position
   */
  public sendPosition(position) {
    this.position.emit(position);
  }

  /**
   * Emet l'identifiant de l'annonce
   * @param id id de l'annonce
   */
  public moreDetails(id) {
    this.emitId.emit(id);
  }

}
