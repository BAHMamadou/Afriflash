import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AfriflashModalProvider } from 'src/providers/afriflash-modal/afriflash-modal.provider';


@Component({
  selector: 'afriflash-filters',
  templateUrl: './afriflash-filters.component.html',
  styleUrls: ['./afriflash-filters.component.scss'],
})
export class AfriflashFiltersComponent implements OnInit {

  /**
   * Valeurs des select
   */
  @Input() public filters: {
    filter1: string,
    filter2: string[]
  }[];

  /**
   * Emet le choix de l'utilisateur
   */
  @Output() public emitChoice = new EventEmitter<{filter1: string, filter2: string}>();

  /**
   * Emet l'adresse choisit comme filtre
   */
  @Output() public emitAdressFilter = new EventEmitter<any>();

  /**
   * Signale si il faut rafraichir la recherche
   */
  @Output() public refreshEvent = new EventEmitter<boolean>();

  /**
   * Valeur du select 2 selectionnée
   */
  public filters2: string[];

  /**
   * Valeur selectionnée
   */
  private choice: {filter1: string, filter2: string};


  constructor(private modal: AfriflashModalProvider) { }

  ngOnInit() {
    // Initialisation du choix
    this.choice = {
      filter1: '',
      filter2: ''
    };
  }

  /**
   * Recupère le filtre choisit
   * @param event évenement emis
   * @param filtre filtre envoyé
   */
  public getFilter(event: any, filtre: string) {
    if (filtre === 'filter1') {
      this.choice.filter1 = event.target.value;
      this.filters2 = null;
    }
    if (filtre === 'filter2') {
      this.choice.filter2 = event.target.value;
      this.emitChoice.emit(this.choice);
    }
  }

  /**
   * Rafraichir la recherche
   */
  public refresh() {
    this.refreshEvent.emit(true);
  }

  /**
   * Recupère les valeurs du filtre 2
   * @param filter1 filtre 1
   */
  private getFilter2(filter1: string) {
    let i;
    for (i = 0; i < this.filters.length; i++) {
      const filter = this.filters[i];
      if (filter.filter1 === filter1) {
        this.filters2 = filter.filter2;
        break;
      }
    }
  }

}
