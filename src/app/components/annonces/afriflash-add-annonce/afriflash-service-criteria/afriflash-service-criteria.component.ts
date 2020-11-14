import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {AfriflashConfigProvider} from "../../../../../providers/afriflash-config/afriflash-config.provider";

@Component({
  selector: 'app-afriflash-service-criteria',
  templateUrl: './afriflash-service-criteria.component.html',
  styleUrls: ['./afriflash-service-criteria.component.scss'],
})
export class AfriflashServiceCriteriaComponent implements OnInit, OnChanges {

  /**
   * Critères Véhicule
   */
  @Input() isMoving = 'Oui';
  @Input() profession: string;

  /**
   * Type de sous catégorie
   */
  @Input() subCategoryType: string;

  /**
   * Emet la valeur (l'objet formulaire)
   */
  @Output() public emitData = new EventEmitter<any>();

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
      this.profession = '';
    }
  }


  /**
   * Send les données
   */
  sendData() {
    const query  = 'input[name=move]:checked';
    const value = document.querySelector(query).getAttribute('value');
    this.isMoving = value;
    const serviceCriteres = {
      isMoving: this.isMoving,
      profession: this.profession,
    };
    this.emitData.emit(serviceCriteres);
  }
}
