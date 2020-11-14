import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

/**
 * Service encapsulant l'ensemble des observables que l'application à besoin
 */
export class AfriflashObservablesProvider {

    /**
     * Observable qui emet un événement lorque la langue change
     */
    public translateEmiter: EventEmitter<string>;

    /**
     * Observable qui emet un événement lorque la valeur de l'input de type radio est renseigné
     */
    public inputRadioEmiter: EventEmitter<string>;

    /**
     * Emet lorsque un utilisateur est connecté
     */
    public isAuth: EventEmitter<boolean>;

    /**
     * Emet lorsque qu'on veux recharger mes annonces
     */
    public loadMyAnnonces: EventEmitter<any>;

    /**
     * Emet un événement concernant le spinner
     */
    public spinnerEvent: EventEmitter<boolean>;

    /**
     * Emet un événement concernant les détails de l'annonce choisit
     */
    public annonceDetails: EventEmitter<any>;

    /**
     * Emet un événement concernant l'initialisation du component Filters
     */
    public initDetailsComponent: EventEmitter<any>;
    
    /*
     * Emet un événement concernant lors du changement du valeur par défaut de la catégory
     */
    public initDefaultCategory: EventEmitter<any>;

    constructor() {
        this.translateEmiter = new EventEmitter<string>();
        this.inputRadioEmiter = new EventEmitter<string>();
        this.isAuth = new EventEmitter<boolean>();
        this.loadMyAnnonces = new EventEmitter<any>();
        this.spinnerEvent = new EventEmitter<boolean>();
        this.annonceDetails = new EventEmitter<any>();
        this.initDetailsComponent = new EventEmitter<any>();
        this.initDefaultCategory = new EventEmitter<any>();
    }
}
