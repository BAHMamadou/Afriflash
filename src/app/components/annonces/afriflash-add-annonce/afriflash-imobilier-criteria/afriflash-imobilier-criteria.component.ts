import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {AfriflashConfigProvider} from '../../../../../providers/afriflash-config/afriflash-config.provider';

@Component({
  selector: 'app-afriflash-imobilier-criteria',
  templateUrl: './afriflash-imobilier-criteria.component.html',
  styleUrls: ['./afriflash-imobilier-criteria.component.scss'],
})
export class AfriflashImobilierCriteriaComponent implements OnInit, OnChanges {

  /**
   * Critères Véhicule
   */
  @Input() surface: number;
  @Input() surfaceMeasure = 'm²';
  @Input() piece: string;

  /**
   * Liste des nombres de pièces possibles
   */
  public pieces = ['1', '2', '3', '4', '5+'];

  /**
   * Emet la valeur (l'objet formulaire)
   */
  @Output() public emitData = new EventEmitter<any>();

  public measures = [
    'm2',
    'Km2',
    'hectares',
    'Autres'
  ];
  @Input() public isTerrain: false;

  /**
   * Action à effectuer
   */
  @Input() public action = 'create';

  constructor(private config: AfriflashConfigProvider) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.action !== 'update') {
      this.surface = 0;
      this.piece = '';
    }
  }

  /**
   * Send les données
   */
  sendData() {
    const imobilierCriteres = {
      surface: this.surface,
      surfaceMeasure: this.surfaceMeasure,
      piece: this.piece,
    };
    this.emitData.emit(imobilierCriteres);
  }
}
