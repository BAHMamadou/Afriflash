import {Component, OnInit, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {AfriflashDataProvider} from 'src/providers/afriflash-data/afriflash-data.provider';
import {AfriflashConfigProvider} from "../../../../../providers/afriflash-config/afriflash-config.provider";

@Component({
    selector: 'app-afriflash-vehicle-criteria',
    templateUrl: './afriflash-vehicle-criteria.component.html',
    styleUrls: ['./afriflash-vehicle-criteria.component.scss'],
})
export class AfriflashVehicleCriteriaComponent implements OnInit, OnChanges {

    /**
     * Critères Véhicule
     */
    @Input() marque: string;
    @Input() modele: string;
    @Input() kilometrage: number;
    @Input() yearCirculation: string;

    /**
     * Type de sous catégorie
     */
    @Input() subCategoryType: string;

    /**
     * Emet la valeur (l'objet formulaire)
     */
    @Output() public emitData = new EventEmitter<any>();

    /**
     * Liste des marques
     */
    public marques: string[];

    /**
     * Action à effectuer
     */
    @Input() public action = 'create';

    constructor(private data: AfriflashDataProvider) {
    }

    ngOnInit() {
        this.marques = this.data.getMarques(this.subCategoryType);
    }

    ngOnChanges() {
        if (this.action !== 'update') {
            this.marques = this.data.getMarques(this.subCategoryType);
            this.marque = '';
            this.modele = '';
            this.kilometrage = 0;
            this.yearCirculation = '';
        }
    }

    /**
     * Send les données
     */
    sendData() {
        const vehicleCriteres = {
            marque: this.marque,
            modele: this.modele,
            kilometrage: this.kilometrage,
            yearCirculation: this.yearCirculation
        };
        this.emitData.emit(vehicleCriteres);
    }
}
