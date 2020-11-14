import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {AfriflashConfigProvider} from 'src/providers/afriflash-config/afriflash-config.provider';
import {AfriflashDataProvider} from 'src/providers/afriflash-data/afriflash-data.provider';
import {AfriflashSessionProvider} from 'src/providers/afriflash-session/afriflash-session.provider';
import {AfriflashHttpAnnonceProvider} from 'src/providers/afriflash-http/afriflash-http-annonce.provider';
import {AfriflashControlAnnonceProvider} from 'src/providers/afriflash-control-fields/afriflash-control-annonce.provider';
import {AfriflashObservablesProvider} from 'src/providers/afriflash-observables/afriflash-observables.provider';

@Component({
    selector: 'app-afriflash-ad-filters',
    templateUrl: './afriflash-ad-filters.component.html',
    styleUrls: ['./afriflash-ad-filters.component.scss'],
})
export class AfriflashAdFiltersComponent implements OnInit {

    /**
     * Critéres vehicule
     */
    public vehicleCriteres: {
        marque: string,
        modele: string,
        kilometrage: number,
        yearCirculation: string
    } = {
        marque: '',
        modele: '',
        kilometrage: 0,
        yearCirculation: ''
    };

    /**
     * Critères Immobilier
     */
    public immobilierCriteres: {
        surface: number,
        surfaceMeasure: string,
        piece: string
    } = {
        surface: 0,
        surfaceMeasure: '',
        piece: ''
    };

    /**
     * Critères Service
     */
    public serviceCriteres: {
        isMoving: string,
        profession: string
    } = {
        isMoving: '',
        profession: ''
    };

    /**
     * Critères générales
     */
    @Input() public criteres: {
        typeAnnonce: string,
        category: string,
        country: string,
        subCategories: string[],
        filters: any,
        acountType: string
    } = {
        typeAnnonce: '',
        category: '',
        country: '',
        subCategories: [],
        filters: {},
        acountType: ''
    };

    @Input() public hiddeSpinner = true;
    /**
     * Valeur de la categorie par défaut
     */
    @Input() public categoryDefault: string;

    /**
     * Liste des marques
     */
    public marques: string[];

    /**
     * Catégories object
     */
    public categoriesObjects: any;

    /**
     * Liste des pays
     */
    public countries: string[];

    /**
     * Liste des catégories
     */
    public categories: string[];

    /**
     * Liste des sous-catégories
     */
    public subCategories: string[];

    /**
     * Teste si la plateforme est du web ou non
     */
    public isWeb: boolean;

    /**
     * Envoie les filtres
     */
    @Output() public sendFilters = new EventEmitter<any>();

    constructor(private config: AfriflashConfigProvider,
                private data: AfriflashDataProvider,
                private observable: AfriflashObservablesProvider,
                private session: AfriflashSessionProvider,
                private annonceProvider: AfriflashHttpAnnonceProvider,
                private controlFormAnnonce: AfriflashControlAnnonceProvider) {
    }

    ngOnInit() {
        this.criteres.category = this.categoryDefault;
        this.observable.initDefaultCategory.subscribe(
            (category) => {
                this.criteres.category = category;
            }
        );
        // mettre a jour le spinner
        this.observable.spinnerEvent.subscribe(
            (bool) => {
                this.hiddeSpinner = bool;
            }
        );
        this.categoriesObjects = this.data.getCategoriesObjects();
        this.countries = this.data.getCountries();
        this.initCategories();
        this.marques = this.data.getMarques();
        this.isWeb = this.config.isWeb();
    }

    /**
     * Teste si une sous-catégory fait partit du tableau categories
     * @param subCat sous categorie
     */
    public subCategoryIsExist(subCat: any) {
        if (this.criteres.subCategories) {
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < this.criteres.subCategories.length; index++) {
                const subCategory = this.criteres.subCategories[index];
                if (subCategory === subCat) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Envoi les critéres en vue de rechercher les données
     */
    public search() {
        if (this.vehicleCriteres.marque !== '') {
            this.criteres.filters = this.vehicleCriteres;
        }
        // if (this.serviceCriteres) {
        //   this.criteres.filters = this.serviceCriteres;
        // }
        // if (this.immobilierCriteres) {
        //   this.criteres.filters = this.immobilierCriteres;
        // }
        // this.hiddeSpinner = false;
        this.sendFilters.emit(this.criteres);
    }

    getCategory(event) {
        if (event.target.value) {
            this.criteres.category = event.target.value;
            this.criteres.subCategories = null;
            this.subCategories = null;
            this.initSubCategories(this.criteres.category);
        }
    }

    getSubCategory(event) {
        if (event.target.value) {
            this.criteres.subCategories = event.target.value;
        } else {
            this.criteres.subCategories = null;
        }
    }

    /**
     * Recupére toutes les catégories disponnible
     */
    private initCategories() {
        this.categories = Object.keys(this.categoriesObjects);
    }

    /**
     * Recupére toutes les sous catégories disponnible pour une catégorie donnée
     */
    private initSubCategories(category: string) {
        if (category !== 'Tous') {
            this.subCategories = this.categoriesObjects[category];
        }
    }

}
